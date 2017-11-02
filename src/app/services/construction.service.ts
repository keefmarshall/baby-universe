import { Injectable } from '@angular/core';

@Injectable()
export class ConstructionService {
  private constructing = false;

  constructor() { }

  addWork(work: number) {
    if (this.constructing) {
      // do stuff
    }
  }

  isConstructing() {
    return this.constructing;
  }

}
