import { Injectable, OnDestroy } from '@angular/core';
import { UniverseService } from './universe.service';
import { Subscription } from 'rxjs/Subscription';
import { TickerService } from './ticker.service';
import { Globals } from '../globals';

/**
 * This service responsible for universe cooling during phase 2
 */
@Injectable()
export class EntropyService implements OnDestroy {

  // Formula is roughly decayConstant (λ) = 0.7 / T
  // where T is the half life in seconds
  // (it's actually ln(2) not 0.7 but close enough for this.)
  // 0.00038 unmodified half life around 30 minutes but we multiply
  // by log10(temp) which starts ~30 and decreases to ~1
  private readonly decayConstant: number = 0.00038;

  private phaseSub: Subscription;
  private tickerSub: Subscription;

  private started: boolean = false;

  constructor(
    private universeService: UniverseService,
    private tickerService: TickerService
  ) {
    if (this.universeService.universe.phase === 2) {
      this.start();
    }

    this.phaseSub = this.universeService.phase$.subscribe((phase) => {
      this.phaseChange(phase);
    })
  }

  private phaseChange(phase: number) {
    console.log(`Entropy service: phase change to ${phase} detected..`);
    if (phase === 2) {
      this.start();
    } else {
      this.stop();
    }
  }

  start() {
    if (!this.started) {
      this.started = true;
      this.tickerSub = this.tickerService.tick$.subscribe((n) => this.onTick(n))
    }
  }

  stop() {
    this.started = false;
    if (this.tickerSub) {
      this.tickerSub.unsubscribe();
      this.tickerSub = null;
    }
  }

  private onTick(n: number) {
    // guard, in case of rogue subscriptions:
    if (this.started) {
      const u = this.universeService.universe;
      const factor = Globals.tickFactor;
      const slowingDecayConstant = this.decayConstant * Math.log10(u.heat + 1.2);
      u.heat = u.heat * Math.exp(-slowingDecayConstant * factor * Globals.secondsPerTick);
    }
  }

  ngOnDestroy() {
    this.phaseSub.unsubscribe();
    if (this.tickerSub) {
      this.tickerSub.unsubscribe();
    }
  }
}
