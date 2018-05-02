import { Component, OnInit, OnDestroy } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { ALL_PARTICLES, Particle } from '../../physics/particle';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-matter-table',
  templateUrl: './matter-table.component.html',
  styleUrls: ['./matter-table.component.css']
})
export class MatterTableComponent implements OnInit, OnDestroy {
  public matter: Particle[][];

  constructor(
    public universeService: UniverseService,
    public sanitizer: DomSanitizer
  ) {
    this.matter = Object.keys(ALL_PARTICLES)
        .map((c) => ALL_PARTICLES[c])
        .filter((p) => p.matter)
        .map((p) => [p, ALL_PARTICLES[p.antiparticleCode]]);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  getParticles() {
    return Object.keys(this.universeService.universe.matter);
  }

}
