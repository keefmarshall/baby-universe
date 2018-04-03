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

}
