import { Injectable } from '@angular/core';

import { Globals } from '../globals';

import { Universe } from './universe';
import { UniverseService } from './universe.service';
import { TickerService } from './ticker.service';
import { Meter } from 'app/meters/meter';
import { EnergyMeter } from 'app/meters/energy-meter';

@Injectable()
export class MeteringService {
  private readonly ticksPerSecond = Math.round(1 / Globals.secondsPerTick);

  private meters = new Map<string, Meter>();

  constructor(
    private universeService: UniverseService,
    private tickerService: TickerService
  ) {
    this.meters.set('energy', new EnergyMeter(universeService.universe));
    tickerService.tick$.subscribe(n => this.onTick(n));
  }

  onTick(n: number) {
    if (n % this.ticksPerSecond == 0) {
      const u = this.universeService.universe;
      this.meters.forEach(meter => {
        meter.everySecond(u);
      });
    }
  }

  read(meterName: string): number {
    return this.meters.get(meterName).meterValue;
  }
}
