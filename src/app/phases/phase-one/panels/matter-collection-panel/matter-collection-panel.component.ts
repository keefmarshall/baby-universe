import { Component, OnInit } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';

@Component({
  selector: 'app-matter-collection-panel',
  templateUrl: './matter-collection-panel.component.html',
  styleUrls: ['./matter-collection-panel.component.css']
})
export class MatterCollectionPanelComponent implements OnInit {
  private gameOn = false;

  constructor(public universeService: UniverseService) { }

  ngOnInit() {
  }

  showStargame() {
    // TODO: use presence of matter funnels and toggle button to decide
    return !this.universeService.universe.machines['MatterFunnel'] || this.gameOn;
  }

  toggleStargame() {
    this.gameOn = !this.gameOn;
  }
}
