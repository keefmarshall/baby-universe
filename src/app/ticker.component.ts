import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { TickerService } from './services/ticker.service';
import { UniverseService } from './services/universe.service';
import { Universe } from './services/universe';

@Component({
  selector: 'app-ticker',
  template: `
    <span>
      <!-- {{ ticker }} | -->
      Energy: {{ universe.energy | number:'1.0-2' }} MeV |
      {{ universe.elapsedSeconds | number:'1.0-0' }}
    </span>`,
})
export class TickerComponent implements OnInit {
  public ticker: number = 0;
  public universe: Universe;

  constructor(
    private tickerService: TickerService,
    private universeService: UniverseService
  ) { }

  ngOnInit() {
    this.universe = this.universeService.universe;

    this.tickerService.tick$.subscribe(n => {
        this.ticker = this.ticker + 1;
    });
  }

}
