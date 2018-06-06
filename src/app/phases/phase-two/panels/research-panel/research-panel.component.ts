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
  projectResearchers: number = 0;
  maxes: { [key: string]: number } = {};

  private readonly ALL_LABELS = [
    "researchImprovement",
    "contraptionImprovement",
    "contraptionStrengthImprovement",
    "makerImprovement",
    "builderImprovement"
  ];

  constructor(
    public universeService: UniverseService,
    public researchService: ResearchService
  ) { }

  ngOnInit() {
    this.calculateMaxValues();
    this.projectList = this.researchService.researchList.projectList
      .filter(project => project.correctPhase(this.universeService.universe));
  }

  isComplete(project: ResearchProject) {
    const u = this.universeService.universe;
    return (u.research[project.name] != null && u.research[project.name].researched);
  }

  shouldShow(project: ResearchProject): boolean {
    return project.preconditions(this.universeService.universe) &&
          !this.isComplete(project);
          // && project.correctPhase(this.universeService.universe);
  }

  canResearch() {
    return !this.researchService.isResearching();
  }

  changeAssignment(label: string, toAmount: number) {
    this.getRudimentaryResearcher().extras[label] = toAmount;
    this.calculateMaxValues();
  }

  private calculateMaxValues() {
    const rr = this.getRudimentaryResearcher();
    let numAssigned = 0;
    // NB could use .reduce() here but for is massively quicker
    for (let i = 0; i < this.ALL_LABELS.length; i++) {
      numAssigned += rr.extras[this.ALL_LABELS[i]];
    }

    this.projectResearchers = rr.quantity - numAssigned;

    this.ALL_LABELS.forEach(label => {
      this.maxes[label] = rr.quantity + rr.extras[label] - numAssigned;
    });
  }

  getRudimentaryResearcher(): MachineProperties {
    return this.universeService.universe.machines['RudimentaryResearcher'];
  }

}
