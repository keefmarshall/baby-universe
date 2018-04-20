import { Injectable } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { ConstructionProject } from 'app/machines/construction-project';
import { TickerService } from 'app/services/ticker.service';
import { Globals } from 'app/globals';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConstructionService {
  public currentProject: ConstructionProject = null;

  private readonly ticksPerSecond = Math.round(1 / Globals.secondsPerTick);

  private currentWork: number = 0;
  public energyDrawPerSecond: number = 0;
  public sabotaged = false;

  public events$ = new Subject<ConstructionEvent>();

  constructor(
    private universeService: UniverseService,
    private tickerService: TickerService
  ) {
    // The state management service takes care of initialising us after a
    // page reload
    tickerService.tick$.subscribe(n => this.onTick(n));
  }

  /** this is just for metering energy usage */
  onTick(n: number) {
    if (n % this.ticksPerSecond === 0) {
      // once per second:
      this.energyDrawPerSecond = this.currentWork;
      this.currentWork = 0;
    }
  }

  construct(project: ConstructionProject): boolean {
    if (this.isConstructing() || this.sabotaged) {
      console.log("Can't build construction, already constructing!");
      return false;
    } else if (project.payFor(1)) {
      console.log("Constructing " + project.name);
      this.universeService.universe.currentConstructionProject = project.name;
      this.currentProject = project;
      this.events$.next(new ConstructionEvent("started", project));
      return true;
    } else {
      console.log("Can't afford " + project.name);
      return false;
    }

  }

  addWork(work: number) {
    if (this.isConstructing() && !this.sabotaged) {
      this.currentWork += work;
      if (this.currentProject.addWork(work)) {
        // project complete:
        console.log("Built " + this.currentProject.name);
        const lastProject = this.currentProject;
        this.currentProject = null;
        this.universeService.universe.currentConstructionProject = null;
        this.universeService.universe.currentConstructionWork = 0;
        this.events$.next(new ConstructionEvent("completed", lastProject));
      } else {
        this.universeService.universe.currentConstructionWork =
          this.currentProject.currentWorkTotal();
      }
    }
  }

  isConstructing() {
    return this.currentProject != null;
  }

  sabotage() {
    this.sabotaged = true;
    this.events$.next(new ConstructionEvent("sabotaged", this.currentProject));
    setTimeout(() => this.repaired(), 30000);
    if (this.isConstructing()) {
      this.currentProject.reset();
      this.currentProject = null;
      this.universeService.universe.currentConstructionProject = null;
      this.universeService.universe.currentConstructionWork = 0;
    }
  }

  repaired() {
    this.sabotaged = false;
  }
}

export class ConstructionEvent {
  constructor(public type: string, public project?: ConstructionProject) {
  }
}