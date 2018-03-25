import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../../../services/universe.service';

@Component({
  selector: 'phase-two-research-panel',
  templateUrl: './research-panel.component.html',
  styleUrls: ['./research-panel.component.scss']
})
export class ResearchPanelComponent implements OnInit {

  constructor(public universeService: UniverseService) { }

  ngOnInit() {
  }

}
