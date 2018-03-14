import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { MeteringService } from './services/metering.service';
// import { TickerService } from './services/ticker.service';
import { UniverseService } from './services/universe.service';
import { Universe } from './services/universe';

@Component({
  selector: 'app-ticker',
  template: `
    <span *ngIf="universe().photonCount > 0">
      Energy: {{ universe().energy | mev }}
      | {{ meteringService.read('energy') | mev }}/s
    </span>`,
})
export class TickerComponent implements OnInit {
  // public ticker: number = 0;

  constructor(
    public meteringService: MeteringService,
    // private tickerService: TickerService,
    private universeService: UniverseService
  ) { }

  ngOnInit() {
    // this.tickerService.tick$.subscribe(n => {
    //     this.ticker = this.ticker + 1;
    // });
  }

  universe() {
    return this.universeService.universe;
  }
}
