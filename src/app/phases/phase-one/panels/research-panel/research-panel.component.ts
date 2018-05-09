import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResearchProject } from 'app/research/research-project';
import { PhotonicPhilosopher } from 'app/machines/photonic-philosopher';

import { MachineService } from 'app/services/machine.service';
import { TickerService } from 'app/services/ticker.service';
import { UniverseService } from 'app/services/universe.service';
import { ResearchService } from 'app/services/research.service';
import { Globals } from 'app/globals';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-research-panel',
  templateUrl: './research-panel.component.html',
  styleUrls: ['./research-panel.component.css']
})
export class ResearchPanelComponent implements OnInit, OnDestroy {
  projectList: Array<ResearchProject>;
  private canResearch: boolean = false;
  private distracted: boolean = false;
  private distractionTicks = 30 / Globals.secondsPerTick;
  private distractionTicksRemaining: number = 0;

  private ticksub: Subscription;

  constructor(
    public universeService: UniverseService,
    private tickerService: TickerService,
    private researchService: ResearchService
  ) {
  }

  ngOnInit() {
    this.projectList = this.researchService.researchList.projectList;
    this.ticksub = this.tickerService.tick$.subscribe(n => this.onTick(n));
  }

  ngOnDestroy(): void {
    this.ticksub.unsubscribe();
  }

  onTick(n: number) {
    if (this.tickerService.resumeFor < 1) { // save calculations when catching up
      // Update availability of projects
      const u = this.universeService.universe;
      this.projectList.forEach(project => {
        project.canSee = project.preconditions(u);
      });
    }

    this.canResearch =
      (this.researchService.scienceCount > 0) &&
      !this.researchService.isResearching() &&
      !this.distracted;

    if (this.distracted) {
      this.distractionTicksRemaining -= Globals.tickFactor; // usually 1 but can speed up during catchup
      if (this.distractionTicksRemaining <= 0) {
        this.distracted = false;
      }
    }

  }

  researchProject(project: ResearchProject) {
    if (this.canResearch) {
      this.researchService.startProject(project);
    } else {
      console.log("Can't start new projects at this time!");
    }
  }

  isComplete(project: ResearchProject) {
    const u = this.universeService.universe;
    return (u.research[project.name] != null && u.research[project.name].researched);
  }

  generateParadox() {
    this.distracted = true;
    this.distractionTicksRemaining = this.distractionTicks;
    this.researchService.stopProject();
  }

  distractionProgress() {
    return (this.distractionTicks - this.distractionTicksRemaining) * 100 /
      this.distractionTicks;
  }

  shouldShow(project: ResearchProject): boolean {
    return project.preconditions(this.universeService.universe) &&
          !this.isComplete(project) &&
          project.correctPhase(this.universeService.universe);
  }
}
