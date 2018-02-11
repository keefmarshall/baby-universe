import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';
import { Globals } from '../globals';
import { Subscriber } from 'rxjs/Subscriber';
import { GameModule } from 'app/games/game.module';

enum PausedState {
  RUNNING, PAUSED, RESUMING
}

enum GameState {
  STARTED, SUPERVISED, ENDGAME
}

@Injectable()
export class TickerService {

  public tick$: Observable<number>;

  private pauser = new Subject<PausedState>();

  private hiddenAt: number = null;
  public resumeFor: number = 0;

  private internalTicker$: Observable<number>;

  private gameState: GameState = GameState.STARTED;
  public supervisorEfficiency: number = 0.1;

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
        switch (this.gameState) {
          case GameState.SUPERVISED:
            const hiddenFor = (event.timeStamp - this.hiddenAt);
            console.log("Was hidden for: " + Math.round(hiddenFor / 1000) + " seconds");
            this.hiddenAt = null;
            this.resumeFor += Math.round(hiddenFor * this.supervisorEfficiency / (1000 * Globals.secondsPerTick));
            this.resume();
            break;
          case GameState.ENDGAME:
            break; // don't restart
          default:
            this.run();
        }
      }
    }
  }

  catcherUpper(): Observable<number> {
    console.log("CatcherUpper: resuming for " + this.resumeFor + " ticks..");
    if (this.resumeFor > 100000) {
      Globals.tickFactor = 5000;
    } else if (this.resumeFor > 1000) {
      Globals.tickFactor = 200;
    } else if (this.resumeFor > 100) {
      Globals.tickFactor = 10;
    }

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
  }

  ///////////////////////////////////////////////////////////////////
  // Game state management

  gameSupervised() {
    this.gameState = GameState.SUPERVISED;
  }

  gameEnd() {
    this.gameState = GameState.ENDGAME;
  }

  isSupervised(): boolean {
    return this.gameState === GameState.SUPERVISED;
  }
}
