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
  private matter: Particle[][] = [];
  private interval;

  constructor(
    private universeService: UniverseService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.interval = setInterval(() => this.calculateMatterTable(), 250);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getMatter(): Particle[][] {
    return this.matter;
  }

  /**
   * Try to do this less frequently than an Angular refresh as it's quite
   * intensive
   */
  private calculateMatterTable() {
    this.matter = Object.keys(this.universeService.universe.matter)
      .map((c) => ALL_PARTICLES[c])
      .filter((p) => p.matter)
      .map((p) => {
        return [p, ALL_PARTICLES[p.antiparticleCode]];
      });
  }
}
