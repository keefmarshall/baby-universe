import { Component, OnInit } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { ResearchList } from 'app/research/research-list';
import { ResearchProject } from 'app/research/research-project';

@Component({
  selector: 'app-help-research',
  templateUrl: './help-research.component.html',
  styleUrls: ['./help-research.component.scss']
})
export class HelpResearchComponent implements OnInit {
  public research: Array<ResearchProject>;

  constructor(public universeService: UniverseService) {

  }

  ngOnInit() {
    const u = this.universeService.universe;
    this.research = new ResearchList().projectList.filter(project => {
      return project.preconditions(u);
    });
  }

}
