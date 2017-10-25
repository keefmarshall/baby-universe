import { Injectable } from '@angular/core';

import { ParticleService } from './particle.service';
import { TickerService } from './ticker.service';
import { UniverseService } from './universe.service';

import { Globals } from '../globals';
import { Universe } from './universe';

import { MachineFactory } from '../machines/machine-factory';
import { Machine, MachineProperties } from '../machines/machine';

@Injectable()
export class MachineService {
  private machines: Array<Machine> = [];
  private machineNames: Array<string> = [];
  private machineFactory = new MachineFactory();

  constructor(
    private particleService: ParticleService,
    private tickerService: TickerService,
    private universeService: UniverseService
  ) {
    console.log('Machine Service constructor, starting tick subscription now');
    this.resetMachines();
    this.tickerService.tick$.subscribe(n => this.onTick(n));
  }

  resetMachines() {
    this.machineNames = [];
    this.machines = [];

    Object.keys(this.universeService.universe.machines).forEach(m => {
      const machine = this.machineFactory.newMachine(name);
      this.machines.push(machine);
      this.machineNames.push(m);
    });
  }

  onTick(n: number) {
    // This is the core machine loop. Here's where the magic happens!
    this.machines.forEach(machine => {
      const u = this.universeService.universe;
      machine.onTick(u, u.machines[machine.name]);
    });
  }

  addMachine(machine: Machine) {

    const exists = this.machineNames.includes(machine.name);
    const universe = this.universeService.universe;

    if (universe.machines[machine.name] == null) {
      universe.machines[machine.name] = machine.defaultProperties();
    }

    if (!exists) {
      this.machines.push(machine);
      this.machineNames.push(machine.name);
    } else {
      // increment the quantity
      universe.machines[machine.name].quantity += 1;
    }

  }

}

