import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';
import { Globals } from '../globals';

@Injectable()
export class TickerService {

  public tick$: Observable<number>;

  private pauser = new Subject<boolean>();

  constructor() {
    // Trying to make this pausable, doesn't currently work.
    console.log("Constructing universal ticker...");
    this.pauser.next(false);

    const internalTicker$ = Observable.interval(1000 * Globals.secondsPerTick).share();
    this.tick$ = this.pauser.startWith(false).switchMap(paused => {
      // paused ? Observable.never() : internalTicker$
      if (paused) {
        console.log("Pauser: paused, using never()");
        return Observable.never();
      } else {
        console.log("Pauser: not paused, returning internal ticker");
        return internalTicker$;
      }
    }
    );

    // this.pauser.next(false);

    // this.tick$ = Observable.interval(1000 * Globals.secondsPerTick).share();
  }

  pause() {
    this.pauser.next(true);
  }

  resume() {
    this.pauser.next(false);
  }

}
