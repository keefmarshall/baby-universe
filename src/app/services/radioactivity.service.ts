import { Injectable, OnDestroy } from '@angular/core';
import { UniverseService } from './universe.service';
import { Subscription } from 'rxjs/Subscription';
import { TickerService } from './ticker.service';

@Injectable()
export class RadioactivityService implements OnDestroy {
  private tickersub: Subscription;
  private running: boolean = false;

  constructor(
    private universeService: UniverseService,
    private tickerService: TickerService
  ) {
    if (this.universeService.universe.machines['RadioactivityCentre']) {
      this.start();
    }
  }

  start() {
    console.log("Starting Radioactivity Service");
    if (!this.tickersub) {
      this.tickersub = this.tickerService.tick$.subscribe((n) => this.onTick(n));
    }
    this.running = true;
  }

  stop() {
    console.log("Stopping Radioactivity Service");
    if (this.tickersub) {
      this.tickersub.unsubscribe();
    }
    this.running = false;
  }

  private onTick(n: number) {

  }

  ngOnDestroy(): void {
    if (this.tickersub) {
      this.tickersub.unsubscribe();
    }
  }
}

export class DecayPattern {
  constructor(
    public inputs: string[],
    public description: string,
    public results: string[]
  ) { }
}


export const DECAY_PATTERNS: { [key: number]: DecayPattern } = {
  1: new DecayPattern(["t"], "t -> W⁺b -> be⁺ν<sub>e</sub>", ["b", "e⁺", "νe"]),
  2: new DecayPattern(["t"], "t -> W⁺b -> bμ⁺ν<sub>μ</sub>", ["b", "μ⁺", "νμ"])
};

export class Particle {
  constructor(
    public code: string, // e.g. 'n' for neutron, "νμ" for muon-neutrino etc
    public displayCode: string, // e.g. ν<sub>μ</sub> - can contain HTML
    public name: string, // e.g. "muon neutrino"
    public matter: boolean, // false is anti-matter
    public antiparticleCode: string // e.g. "b̅" for bottom quark
  ) { }
}

// TODO this definitely needs to be somewhere else!
export const ALL_PARTICLES: { [key: string]: Particle } = {
  'b': new Particle("b", "b", "bottom quark", false, "b̅"),
  'b̅': new Particle("b̅", "b̅", "bottom antiquark", false, "b"),
  't': new Particle("t", "t", "top quark", true, "t̅"),
  't̅': new Particle("t̅", "t̅", "top antiquark", false, "t"),
}



//     "tt̅ -> W⁺W⁻bb̅ -> "
