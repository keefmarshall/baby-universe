import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';
import { Globals } from '../globals';

@Injectable()
export class TickerService {

  public tick$: Observable<number>;

  private pauser = new Subject<boolean>();

  constructor() {
    // Trying to make this pausable, doesn't currently work.
    // this.pauser.next(false);

    // const internalTicker$ = Observable.interval(1000 * this.secondsPerTick).share();
    // this.tick$ = this.pauser.switchMap(paused =>
    //    paused ? Observable.never() : internalTicker$
    // );

    this.tick$ = Observable.interval(1000 * Globals.secondsPerTick).share();
  }

  pause() {
    this.pauser.next(true);
  }

  resume() {
    this.pauser.next(false);
  }

}
