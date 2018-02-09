import { Injectable } from '@angular/core';

import { TickerService } from './ticker.service';
import { UniverseService } from './universe.service';

import { Globals } from '../globals';

@Injectable()
export class TimeService {

  constructor(
    private tickerService: TickerService,
    private universeService: UniverseService
  ) {
    console.log("********** TimeService: Subscribing to ticker..");
    tickerService.tick$.subscribe(n => {
      this.universeService.universe.elapsedTicks += Globals.tickFactor;
      this.universeService.universe.elapsedSeconds =
        Globals.round(
          this.universeService.universe.elapsedSeconds + (Globals.secondsPerTick * Globals.tickFactor),
          12);

      // if (n % 10 === 0) {
      //   console.log("TimeService: n = " + n);
      // }
    });
  }

}
