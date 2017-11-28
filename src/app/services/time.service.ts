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
    tickerService.tick$.subscribe(n => {
      this.universeService.universe.elapsedTicks += 1;
      this.universeService.universe.elapsedSeconds =
        Globals.round(
          this.universeService.universe.elapsedSeconds + Globals.secondsPerTick,
          12);
    });
  }

}
