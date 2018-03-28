import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../../../services/universe.service';
import { ResearchService } from '../../../../services/research.service';
import { ResearchList } from '../../../../research/research-list';
import { ResearchProject } from '../../../../research/research-project';
import { MachineProperties } from '../../../../machines/machine';

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

  canResearch() {
    return !this.researchService.isResearching();
  }

  researchMax() {
    const rr = this.getRudimentaryResearcher();
    return rr.quantity - rr.extras['contraptionImprovement'];
  }

  constructionMax() {
    const rr = this.getRudimentaryResearcher();
    return rr.quantity - rr.extras['researchImprovement'];
  }

  projectResearchers(): number {
    return this.getRudimentaryResearcher().quantity -
        (this.researchImprovers() + this.contraptionImprovers());
  }

  researchImprovers(): number {
    return this.getRudimentaryResearcher().extras['researchImprovement'];
  }

  contraptionImprovers(): number {
    return this.getRudimentaryResearcher().extras['contraptionImprovement'];
  }

  getRudimentaryResearcher(): MachineProperties {
    return this.universeService.universe.machines['RudimentaryResearcher'];
  }

  onResImpChange(value) {
    const rr = this.getRudimentaryResearcher();
    if (value < 0) {
      rr.extras['researchImprovement'] = 0
    } else if (value > this.researchMax()) {
      rr.extras['researchImprovement'] = this.researchMax()
    } else {
      rr.extras['researchImprovement'] = value;
    }
  }

  onConImpChange(e) {

  }
}
