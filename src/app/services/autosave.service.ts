import { Injectable } from '@angular/core';

import { TickerService } from './ticker.service';
import { UniverseService } from './universe.service';

import { Globals } from '../globals';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class AutosaveService {

  public enabled = false;
  public frequency = 20;

  constructor(
    private tickerService: TickerService,
    private universeService: UniverseService,
    private toastyService: ToastyService
  ) {
    this.tickerService.tick$.subscribe(n => {
      // every 5 seconds
      const interval = (this.frequency / Globals.secondsPerTick);
      if (n % interval === 0) { 
        this.autosave();
        this.toastyService.info("Autosave");
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
