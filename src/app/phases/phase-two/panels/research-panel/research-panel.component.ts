import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../../../services/universe.service';
import { ResearchService } from '../../../../services/research.service';
import { ResearchList } from '../../../../research/research-list';
import { ResearchProject } from '../../../../research/research-project';

@Component({
  selector: 'phase-two-research-panel',
  templateUrl: './research-panel.component.html',
  styleUrls: ['./research-panel.component.scss']
})
export class ResearchPanelComponent implements OnInit {
  projectList: Array<ResearchProject>;

  constructor(
    public universeService: UniverseService,
    public researchService: ResearchService
  ) { }

  ngOnInit() {
    this.projectList = this.researchService.researchList.projectList;
  }

  isComplete(project: ResearchProject) {
    const u = this.universeService.universe;
    return (u.research[project.name] != null && u.research[project.name].researched);
  }

  shouldShow(project: ResearchProject): boolean {
    return project.preconditions(this.universeService.universe) &&
          !this.isComplete(project) &&
          project.correctPhase(this.universeService.universe);
  }

  researchMax() {
    const rr = this.universeService.universe.machines['RudimentaryResearcher'];
    return rr.quantity - rr.extras.contraptionImprovement;
  }

  constructionMax() {
    const rr = this.universeService.universe.machines['RudimentaryResearcher'];
    return rr.quantity - rr.extras.researchImprovement;
  }
}
