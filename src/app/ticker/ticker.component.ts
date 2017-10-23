import { Component, OnInit } from '@angular/core';
import { TickerService } from '../ticker.service';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {
  public ticker: number = -1;

  constructor(
    private tickerService: TickerService
  ) { }

  ngOnInit() {
    this.tickerService.tick$.subscribe(n => {
      if (n % 4 == 0) {
        this.ticker = this.ticker + 1;
      }

    });
  }

}
