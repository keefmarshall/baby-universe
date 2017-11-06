import { Component, OnInit } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { ConstructionService } from 'app/services/construction.service';

@Component({
  selector: 'app-construction-panel',
  templateUrl: './construction-panel.component.html',
  styleUrls: ['./construction-panel.component.css']
})
export class ConstructionPanelComponent implements OnInit {

  constructor(
    private universeService: UniverseService,
    private constructionService: ConstructionService
  ) { }

  ngOnInit() {
  }
}
