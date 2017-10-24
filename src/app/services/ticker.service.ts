import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class TickerService {

  public secondsPerTick = 0.1;
  public tick$: Observable<number>;

  constructor() { 
    this.tick$ = Observable.interval(1000 * this.secondsPerTick).share();
  }

}
