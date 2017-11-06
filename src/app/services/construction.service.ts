import { Injectable } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { ConstructionProject } from 'app/machines/construction-project';
import { TickerService } from 'app/services/ticker.service';
import { Globals } from 'app/globals';

@Injectable()
export class ConstructionService {
  public currentProject: ConstructionProject = null;

  private readonly ticksPerSecond = Math.round(1 / Globals.secondsPerTick);
  
  private currentWork: number = 0;
  public energyDrawPerSecond: number = 0;

  constructor(
    private universeService: UniverseService,
    private tickerService: TickerService
  ) {
    // Ideally we'd initialise the project from the universe, on load.
    // But the universe only has the name, and we have a circular dep 
    // which prevents us injecting machineFactory. So, if you refresh the
    // page you lose any in-progress construction project. 
    this.universeService.universe.currentConstructionProject = null;

    tickerService.tick$.subscribe(n => this.onTick(n));
  }

  /** this is just for metering energy usage */
  onTick(n: number) {
    if (n % this.ticksPerSecond == 0) {
      // once per second:
      this.energyDrawPerSecond = this.currentWork;
      this.currentWork = 0;
    }
  }

  construct(project: ConstructionProject): boolean {
    if (this.isConstructing()) {
      console.log("Can't build construction, already constructing!");
      return false;
    } else {
      console.log("Constructing " + project.name);
      this.universeService.universe.currentConstructionProject = project.name;
      this.currentProject = project;
    }
  }

  addWork(work: number) {
    if (this.isConstructing()) {
      this.currentWork += work;
      if (this.currentProject.addWork(work)) {
        // project complete:
        console.log("Built " + this.currentProject.name);
        this.currentProject = null;
        this.universeService.universe.currentConstructionProject = null;
      }
    }
  }

  isConstructing() {
    return this.currentProject != null;
  }

}
