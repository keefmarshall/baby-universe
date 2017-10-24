import { Injectable } from '@angular/core';
import { UniverseService } from './universe.service';
@Injectable()
export class ParticleService {

  constructor(
    private universeService: UniverseService
  ) { }

  collectPhoton() {
    // low energy photons, 0.1MeV to 1MeV. An annihilation between a positron
    // and electron at rest is about 0.5 MeV, for comparison.
    this.universeService.universe.energy += 0.5;
  }

  
}
