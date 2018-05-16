import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../../../services/universe.service';

@Component({
  selector: 'phase-two-radioactivity-panel',
  templateUrl: './radioactivity-panel.component.html',
  styleUrls: ['./radioactivity-panel.component.scss']
})
export class RadioactivityPanelComponent implements OnInit {

  constructor(public universeService: UniverseService) { }

  ngOnInit() {
  }

}
