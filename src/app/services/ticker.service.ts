import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';
import { Globals } from '../globals';
import { Subscriber } from 'rxjs/Subscriber';

enum PausedState {
  RUNNING, PAUSED, RESUMING
}

@Injectable()
export class TickerService {

  public tick$: Observable<number>;

  private pauser = new Subject<PausedState>();

  private hiddenAt: number = null;
  public resumeFor: number = 0;

  private internalTicker$: Observable<number>;

  constructor() {
    // Trying to make this pausable, doesn't currently work.
    console.log("Constructing universal ticker...");
    this.pauser.next(PausedState.RUNNING);

    this.internalTicker$ = Observable.interval(1000 * Globals.secondsPerTick);

    this.tick$ = this.pauser
      .startWith(PausedState.RUNNING)
      .switchMap(paused => {
        // paused ? Observable.never() : internalTicker$
        switch (paused) {
          case PausedState.PAUSED:
            console.log("Pauser: paused, using never()");
            return Observable.never();
          case PausedState.RESUMING:
            console.log("Pauser: resuming from background");
            return Observable.concat(this.catcherUpper(), this.internalTicker$);
          case PausedState.RUNNING:
            console.log("Pauser: not paused, returning internal ticker");
            return this.internalTicker$;
        }
      })
      .share() as Observable<number>;

    // this.pauser.next(false);

    // this.tick$ = Observable.interval(1000 * Globals.secondsPerTick).share();

    // Detect page going into the background and back out
    document.addEventListener("visibilitychange", (event) => {
      this.handleVisibilityChangeEvent(event);
    });
  }

  pause() {
    this.pauser.next(PausedState.PAUSED);
  }

  resume() {
    this.pauser.next(PausedState.RESUMING);
  }

  run() {
    this.pauser.next(PausedState.RUNNING);
  }

  handleVisibilityChangeEvent(event: Event) {
    // console.log("Current visibility: " + document.visibilityState);
    // console.log("Document hidden is " + document.hidden);

    if (document.hidden) {
      this.hiddenAt = event.timeStamp;
      this.pause();
    } else {
      if (this.hiddenAt) {
        const hiddenFor = (event.timeStamp - this.hiddenAt);
        console.log("Was hidden for: " + hiddenFor);
        this.hiddenAt = null;
        this.resumeFor += Math.round(hiddenFor / (1000 * Globals.secondsPerTick));
        this.resume();
      }
    }
  }

  catcherUpper(): Observable<number> {
    console.log("CatcherUpper: resuming for " + this.resumeFor + " ticks..");
    Globals.tickFactor = this.resumeFor > 1000 ? 200 : Math.min(this.resumeFor, 10);
    const cuObs = Observable.create((observer: Subscriber<number>) => {
      const localResumeFor = this.resumeFor;
      let tracker = 0;

      while (tracker < localResumeFor) {
        tracker += Globals.tickFactor;
        this.resumeFor -= Globals.tickFactor;
        observer.next(tracker);
        // console.log("CatcherUpper: returning " + tracker + "(localrf = " + localResumeFor + ")");
      }

      observer.complete();
      Globals.tickFactor = 1;
      this.resumeFor = 0;
      console.log("CatcherUpper: done");
    }) as Observable<number>;

    return cuObs;

    // Various failed attempts to slow this down, or yield every
    // <x> ticks.
    //
    // interval(), delay() and timer() all seem to be completely
    // ignored when used in this context, I have no idea why.

    // return Observable.zip(
    //   cuObs,
    //   // Observable.interval(2000),
    //   this.internalTicker$,
    //   (n, i) => n
    // ) as Observable<number>;

    // Doesn't work
    // const delayer = Observable.empty().delay(2000);
    // return cuObs.concatMap(n => {
    //   return Observable.of(n).concat(delayer); // put some time after the item
    // }) as Observable<number>;

    // delayWithSelector(n => { // delayWithDelector not implemented!
    //   return Observable.timer((n % 5) * 100);
    // });
  }
}
