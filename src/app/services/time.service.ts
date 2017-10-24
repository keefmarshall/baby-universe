import { Injectable } from '@angular/core';

import { TickerService } from './ticker.service';
import { UniverseService } from './universe.service';

@Injectable()
export class TimeService {

  constructor(
    private tickerService: TickerService,
    private universeService: UniverseService
  ) {
    tickerService.tick$.subscribe(n => {
      this.universeService.universe.elapsedTicks += 1;
      this.universeService.universe.elapsedSeconds += tickerService.secondsPerTick;
    });
  }

}
