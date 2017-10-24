import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class TickerService {

  public secondsPerTick = 0.1;
  public tick$: Observable<number>;

  private pauser = new Subject<boolean>();

  constructor() {
    // Trying to make this pausable, doesn't currently work.
    // this.pauser.next(false);

    // const internalTicker$ = Observable.interval(1000 * this.secondsPerTick).share();
    // this.tick$ = this.pauser.switchMap(paused =>
    //    paused ? Observable.never() : internalTicker$
    // );

    this.tick$ = Observable.interval(1000 * this.secondsPerTick).share();
  }

  pause() {
    this.pauser.next(true);
  }

  resume() {
    this.pauser.next(false);
  }

}
