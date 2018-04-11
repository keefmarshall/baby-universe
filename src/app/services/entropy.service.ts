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

  private readonly decayConstant: number = 0.00038; // half life around 30 minutes

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
      u.heat = u.heat * Math.exp(-this.decayConstant * factor * Globals.secondsPerTick);
    }
  }

  ngOnDestroy() {
    this.phaseSub.unsubscribe();
    if (this.tickerSub) {
      this.tickerSub.unsubscribe();
    }
  }
}
