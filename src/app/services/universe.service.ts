import { Injectable } from '@angular/core';
import { Universe } from './universe';

@Injectable()
export class UniverseService {
  public universe: Universe;

  constructor() {
    this.loadUniverse();
  }

  saveUniverse() {
    localStorage.setItem('universe', JSON.stringify(this.universe));
  }

  loadUniverse() {
    const ustr = localStorage.getItem('universe');
    if (ustr != null) {
      this.universe = JSON.parse(ustr);
    } else {
      this.universe = new Universe;
    }
  }

  resetUniverse() {
    this.universe = new Universe;
  }
}
