import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class TickerService {

  public tick$: Observable<number>;

  constructor() { 
    this.tick$ = Observable.interval(250).share();
  }

}
