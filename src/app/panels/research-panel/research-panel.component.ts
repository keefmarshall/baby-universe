import { Component, OnInit } from '@angular/core';
import { ResearchList } from 'app/research/research-list';
import { ResearchProject } from 'app/research/research-project';
import { PhotonicPhilosopher } from 'app/machines/photonic-philosopher';

import { MachineService } from 'app/services/machine.service';
import { TickerService } from 'app/services/ticker.service';
import { UniverseService } from 'app/services/universe.service';
import { ResearchService } from 'app/services/research.service';

@Component({
  selector: 'app-research-panel',
  templateUrl: './research-panel.component.html',
  styleUrls: ['./research-panel.component.css']
})
export class ResearchPanelComponent implements OnInit {
  private projectList: Array<ResearchProject>;
  private canResearch: boolean = false;

  constructor(
    private universeService: UniverseService,
    private tickerService: TickerService,
    private researchService: ResearchService
  ) {
  }

  ngOnInit() {
    const projects = ResearchList.projects;
    // grr.. this is horrible. But using Map.values() doesn't appear to 
    // agree with Angular's *ngFor
    this.projectList = Object.keys(projects).map(p => projects[p]);
    this.tickerService.tick$.subscribe(n => this.onTick(n));
  }

  onTick(n: number) {
    // Update availability of projects
    const u = this.universeService.universe;
    this.projectList.forEach(project => {
      project.canSee = project.preconditions(u);
    });

    this.canResearch = this.researchService.scienceCount > 0;
  }

  researchProject(project: ResearchProject) {
    if (this.canResearch) {
      this.researchService.startProject(project);
    } else {
      console.log("Can't start new projects at this time!");
    }
  }
}
