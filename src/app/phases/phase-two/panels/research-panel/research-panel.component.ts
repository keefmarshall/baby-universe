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
    // return rr.quantity - (this.contraptionImprovers() + this.makerImprovers() + this.builderImprovers());
    return rr.quantity + this.researchImprovers() - this.numAssigned();
  }

  constructionMax() {
    const rr = this.getRudimentaryResearcher();
    // return rr.quantity - (this.researchImprovers() + this.makerImprovers() + this.builderImprovers());
    return rr.quantity + this.contraptionImprovers() - this.numAssigned();
  }

  makerMax() {
    const rr = this.getRudimentaryResearcher();
    return rr.quantity + this.makerImprovers() - this.numAssigned();
  }

  builderMax() {
    const rr = this.getRudimentaryResearcher();
    return rr.quantity + this.builderImprovers() - this.numAssigned();
  }

  constructionStrengthMax() {
    const rr = this.getRudimentaryResearcher();
    return rr.quantity + this.contraptionStrengthImprovers() - this.numAssigned();
  }

  private numAssigned(): number {
    return this.researchImprovers() +  this.contraptionImprovers() + this.makerImprovers()
      + this.builderImprovers() + this.contraptionStrengthImprovers();
  }

  projectResearchers(): number {
    return this.getRudimentaryResearcher().quantity - this.numAssigned();
  }

  researchImprovers(): number {
    return this.getRudimentaryResearcher().extras['researchImprovement'];
  }

  contraptionImprovers(): number {
    return this.getRudimentaryResearcher().extras['contraptionImprovement'];
  }

  contraptionStrengthImprovers(): number {
    return this.getRudimentaryResearcher().extras['contraptionStrengthImprovement'];
  }

  makerImprovers(): number {
    return this.getRudimentaryResearcher().extras['makerImprovement'];
  }

  builderImprovers(): number {
    return this.getRudimentaryResearcher().extras['builderImprovement'];
  }

  getRudimentaryResearcher(): MachineProperties {
    return this.universeService.universe.machines['RudimentaryResearcher'];
  }

}
