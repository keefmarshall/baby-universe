import { Component, OnInit } from '@angular/core';
import { TickerService } from '../services/ticker.service';

@Component({
  selector: 'app-ticker',
  template: `
    <span>{{ticker}}</span>`,
})
export class TickerComponent implements OnInit {
  public ticker: number = -1;

  constructor(
    private tickerService: TickerService
  ) { }

  ngOnInit() {
    this.tickerService.tick$.subscribe(n => {
      if (n % 4 === 0) {
        this.ticker = this.ticker + 1;
      }
    });
  }

}
