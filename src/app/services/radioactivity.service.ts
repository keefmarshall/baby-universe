import { Injectable, OnDestroy } from '@angular/core';
import { UniverseService } from './universe.service';
import { Subscription } from 'rxjs';
import { DecayPattern, DECAY_PATTERNS } from '../physics/decay-pattern';
import { Globals } from '../globals';
import { DecayDesignService } from './decay-design.service';
import { ALL_PARTICLES } from '../physics/particle';

@Injectable()
export class RadioactivityService implements OnDestroy {
  private ddsub: Subscription;
  private running: boolean = false;
  private availablePatternsByParticle: { [key: string]: Set<DecayPattern> } = {};
  private availableParticlesInOrder: string[] = [];

  constructor(
    private universeService: UniverseService,
    private decayDesignService: DecayDesignService
  ) {
    this.universeService.universe.decayPatterns.forEach(pattID => {
      this.updatePatternLists(pattID);
    });
    this.updateAvailableParticles();

    // Make sure we pick up any newly discovered decay patterns
    this.ddsub = this.decayDesignService.events$.subscribe(pattID => {
      this.updatePatternLists(pattID);
      this.updateAvailableParticles();
    });
  }

  public addProgress(particle: string, n: number) {
    // introduce temperature factor - faster decay at lower temps
    const tempFactor = Math.max(1, Math.log10(this.universeService.universe.heat) + 10);
    const adjustedSeconds = n / tempFactor;

    if (this.availablePatternsByParticle[particle]) {
      this.availablePatternsByParticle[particle].forEach(pattern => {
        this.doDecay(pattern, adjustedSeconds); // TODO: * branching ratio
      });
    };
    // this.universeService.universe.decayPatterns
    //   .filter(pattID => PARTICLE_DECAY_PATTERNS[particle].includes[pattID])
    //   .forEach((pattID) => {
    //     this.doDecay(DECAY_PATTERNS[pattID], adjustedSeconds); // TODO * pattern.branchingRatio
    //   })
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

  private updatePatternLists(pattID: string) {
    const pattern = DECAY_PATTERNS[pattID];
    if (pattern.inputs.length === 1) { // ignore multi-input patterns
      const particle = pattern.inputs[0];
      if (!this.availablePatternsByParticle[particle]) {
        this.availablePatternsByParticle[particle] = new Set<DecayPattern>();
      }

      this.availablePatternsByParticle[particle].add(pattern);
    }
  }

  // This is an ordered list of particles that have available decay patterns
  // i.e. particles that can be assigned to Bosonators. The order is important
  // for display purposes, to keep things consistent.
  private updateAvailableParticles() {
    this.availableParticlesInOrder = Object.keys(ALL_PARTICLES)
      .filter(particle => this.availablePatternsByParticle[particle] != null);
  }

  ngOnDestroy(): void {
    if (this.ddsub) {
      this.ddsub.unsubscribe();
    }
  }
}
