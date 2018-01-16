import { Component, OnInit } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';

@Component({
  selector: 'app-matter-table',
  templateUrl: './matter-table.component.html',
  styleUrls: ['./matter-table.component.css']
})
export class MatterTableComponent implements OnInit {

  constructor(private universeService: UniverseService) { }

  ngOnInit() {
  }

  getParticles() {
    return Object.keys(this.universeService.universe.particles);
  }

}
