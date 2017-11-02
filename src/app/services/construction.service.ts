import { Injectable } from '@angular/core';

@Injectable()
export class ConstructionService {
  private constructing = false;

  constructor() { }

  addWork(work: number) {
    
  }

  isConstructing() {
    return this.constructing;
  }

}
