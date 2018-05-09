import { Injectable, OnDestroy } from '@angular/core';
import { UniverseService } from './universe.service';
import { Subscription } from 'rxjs';
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
