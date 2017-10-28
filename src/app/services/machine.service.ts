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

  constructor(
    private machineFactory: MachineFactory,
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

    console.log('Adding machine instances from store..');

    Object.keys(this.universeService.universe.machines).forEach(m => {
      const machine = this.machineFactory.newMachine(m);
      this.machines.push(machine);
      this.machineNames.push(m);
    });

    console.log('Got machine instances: ' + JSON.stringify(this.machines));
    console.log('Rationalising machine availability against preconditions...');

    this.updateAvailability();
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
      machine.onTick();
    });

    this.updateAvailability();
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
    }

    // increment the quantity
    universe.machines[machine.name].quantity += 1;
  }

  /**
   * Reset the machine availability based on the current universe 
   * state (most machines require some precondition which could occur
   * at any time) - this also sets whether the machine is currently
   * affordable.
   * 
   * NB, although the machine objects contain functions to calculate this
   * on demand, we also need to set it in a variable so that Angular can
   * use it for [disabled] etc, as it doesn't like functions in these clauses.
   */
  updateAvailability() {
    // I'm in two minds here - we probably should have observables for things like
    // energy, have a 'watchable' updater which observes tick$ and updates the
    // energy observable and any other key quantity. But I don't know, at this stage,
    // what other quantities will need to be observables, and this mechanism below
    // allows each machine to have completely independent concepts of availability and
    // cost without being tied to any global observable.
    Object.keys(this.machineFactory.allMachines).forEach(m => {
      const machine = this.machineFactory.newMachine(m);
      machine.canSee = machine.preconditions();
      machine.canBuy = machine.affordable(1);
      machine.canBuy10 = machine.affordable(10);
      machine.canBuy100 = machine.affordable(100);
      machine.canBuy1k = machine.affordable(1000);
    });
  }
}

