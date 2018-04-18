import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../../../services/universe.service';

@Component({
  selector: 'phase-two-hadron-panel',
  templateUrl: './hadron-panel.component.html',
  styleUrls: ['./hadron-panel.component.scss']
})
export class HadronPanelComponent implements OnInit {

  constructor(public universeService: UniverseService) { }

  ngOnInit() {
  }

  mesonSteps() {
    const q = this.universeService.universe.machines['MesonMaker'].quantity;

    return Math.max(100 / q, 1);
  }
}
