import { Injectable } from '@angular/core';

import { TickerService } from './ticker.service';
import { UniverseService } from './universe.service';

import { Globals } from '../globals';

@Injectable()
export class AutosaveService {

  public enabled = false;
  public frequency = 60;

  constructor(
    private tickerService: TickerService,
    private universeService: UniverseService
  ) {
    this.tickerService.tick$.subscribe(n => {
      // every 5 seconds
      const interval = (this.frequency / Globals.secondsPerTick);
      if (n % interval === 0) { 
        this.autosave();
      }
    });
  }

  autosave() {
    if (this.enabled) {
      console.log('Autosave..');
      this.universeService.saveUniverse();
    }
  }
}
