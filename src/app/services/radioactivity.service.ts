import { Injectable, OnDestroy } from '@angular/core';
import { UniverseService } from './universe.service';
import { Subscription } from 'rxjs';
import { TickerService } from './ticker.service';
import { DecayPattern, DECAY_PATTERNS, PARTICLE_DECAY_PATTERNS } from '../physics/decay-pattern';
import { Globals } from '../globals';

@Injectable()
export class RadioactivityService implements OnDestroy {
  private tickersub: Subscription;
  private running: boolean = false;

  constructor(
    private universeService: UniverseService
  ) {
  }

  public addProgress(particle: string, n: number) {
    // introduce temperature factor - faster decay at lower temps
    const tempFactor = Math.max(1, Math.log10(this.universeService.universe.heat) + 10);
    const adjustedSeconds = n / tempFactor;

    this.universeService.universe.decayPatterns
      .filter(pattID => PARTICLE_DECAY_PATTERNS[particle].includes[pattID])
      .forEach((pattID) => {
        this.doDecay(DECAY_PATTERNS[pattID], adjustedSeconds); // TODO * pattern.branchingRatio
      })
  }

  private doDecay(pattern: DecayPattern, adjustedSeconds: number = 0.1) {
    const u = this.universeService.universe;

    // Input quantity is the minimum of the input particles
    const inputQ = Math.min(...pattern.inputs.map(p => u.matter[p]));
    if (inputQ > 0) {
      // N(t) = N * e^(-lt) // l is the decay constant (lambda)
      const q = inputQ - Math.floor(inputQ * Math.exp(-pattern.decayConstant * adjustedSeconds));

      pattern.inputs.forEach(input => {
        u.matter[input] -= q;
        if (u.matter[input] < 0) {
          u.matter[input] = 0;
        }
      });

      pattern.results.forEach(result => u.matter[result] += q);
    }
  }

  ngOnDestroy(): void {
    if (this.tickersub) {
      this.tickersub.unsubscribe();
    }
  }
}
