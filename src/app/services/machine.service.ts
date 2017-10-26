import { Injectable } from '@angular/core';

import { TickerService } from './ticker.service';
import { UniverseService } from './universe.service';

import { Globals } from '../globals';
import { Universe } from './universe';

import { MachineFactory } from '../machines/machine-factory';
import { Machine, MachineProperties } from '../machines/machine';


/**
 * Lifecycle management for machines
 */
@Injectable()
export class MachineService {
  private machines: Array<Machine> = [];
  private machineNames: Array<string> = [];
  private available: Array<string> = [];

  private machineFactory = new MachineFactory();

  constructor(
    private tickerService: TickerService,
    private universeService: UniverseService
  ) {
    console.log('Machine Service constructor, starting tick subscription now');
    this.resetMachines();
    this.tickerService.tick$.subscribe(n => this.onTick(n));
  }

  /**
   * Reload the current machines from the state of the universe
   */
  resetMachines() {
    console.log('Resetting machines..');

    this.machineNames = [];
    this.machines = [];
    this.available = [];

    console.log('Adding machine instances from store..');
    
    Object.keys(this.universeService.universe.machines).forEach(m => {
      const machine = this.machineFactory.newMachine(m);
      this.machines.push(machine);
      this.machineNames.push(m);
    });

    console.log('Got machine instances: ' + JSON.stringify(this.machines));

    console.log('Rationalising machine availability against preconditions...');

    this.checkAvailability();
  }

  /**
   * Core tick loop for machine processing
   * 
   * @param n tick number, arbitrary number that increases per tick
   */
  onTick(n: number) {
    const u = this.universeService.universe;

    // This is the core machine loop. Here's where the magic happens!
    this.machines.forEach(machine => {
      machine.onTick(u, u.machines[machine.name]);
    });

    // This could get expensive, so let's only do it every 20 ticks:
    if (n % 20 === 0) {
      // console.log('Refreshing availbility..')
      this.checkAvailability();
      console.log('Got new availability: ' + JSON.stringify(this.available));
    }
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

  /**
   * Reset the machine availability based on the current universe 
   * state (most machines require some precondition which could occur
   * at any time)
   */
  checkAvailability() {
    const u = this.universeService.universe;

    Object.keys(this.machineFactory.allMachines).forEach(m => {
      const machine = this.machineFactory.newMachine(m);
      const preconMet = machine.preconditions(u);
      const isAvailable = this.isAvailable(m);

      // Add newly available machines
      if (preconMet && !isAvailable) {
        this.available.push(m);
      }
      // Remove no longer available machines
      if (!preconMet && isAvailable) {
        const index = this.available.indexOf(m);
        this.available.splice(index, 1);
      }
    });
  }

  /**
   * Is the machine currently available, given the state of the
   * universe?
   */
  isAvailable(m: string) {
    return this.available.includes(m);
  }
}

