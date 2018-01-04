import { Injectable } from '@angular/core';

@Injectable()
export class HeatingService {
  private heating = false;

  constructor() { }

  isHeating() {
    return this.heating;
  }

  setHeating(on: boolean) {
    this.heating = on;
  }
}
