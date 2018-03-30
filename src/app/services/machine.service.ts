import { Injectable } from '@angular/core';

import { TickerService } from './ticker.service';
import { UniverseService } from './universe.service';

import { Globals } from '../globals';
import { Universe } from './universe';

import { MachineFactory } from '../machines/machine-factory';
import { Machine, MachineProperties } from '../machines/machine';
import { LogService } from './log.service';


/**
 * Lifecycle management for machines
 */
@Injectable()
export class MachineService {
  private machines: Array<Machine> = [];
  private machineNames: Array<string> = [];

  public supervisorMessageSeen = false;

  constructor(
    private machineFactory: MachineFactory,
    private tickerService: TickerService,
    private universeService: UniverseService,
    private logService: LogService
  ) {
    console.log('Machine Service constructor, starting tick subscription now');
    this.tickerService.tick$.subscribe(n => this.onTick(n));

    this.supervisorMessageSeen = universeService.universe.supervisorMessageSeen || false;

    // Detect page going into the background and back out
    document.addEventListener("visibilitychange", (event) => {
      this.handleVisibilityChangeEvent(event);
    });
  }

  /**
   * Reload the current machines from the state of the universe
   */
  resetMachines(machines, machineNames) {
    this.machines = machines;
    this.machineNames = machineNames;
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
      machine.onTick(Globals.tickFactor);
    });
  }

  /**
   * Add a machine instance to the universe
   *
   * @param machine instance to add
   */
  addMachine(machine: Machine, quantity: number = 1) {
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
    universe.machines[machine.name].quantity += quantity;
  }

  addMachineByName(machineName: string) {
    const machine = this.machineFactory.newMachine(machineName);
    this.addMachine(machine);
  }

  exists(name: string) {
    // console.log("Exists called with " + name);
    return this.machineNames.includes(name);
  }

  getMachine(name: string): Machine {
    const matches = this.machines.filter(m => m.name === name);
    return matches.length > 0 ? matches[0] : null;
  }

  handleVisibilityChangeEvent(event) {
    // See the same function in TickerService for the main code, this
    // is just to notify the user the first time they put the page into
    // the background, that they'll need to do something to make the
    // machines work.
    if (!document.hidden && !this.supervisorMessageSeen && !this.exists("Supervisor")) {
      this.supervisorMessageSeen = true;
      this.logService.addLog(
        "Your machines are delicate and complex. " +
        "For them to work when you're not here they'll need supervision.");

      this.supervisorMessageSeen = true;
      this.universeService.universe.supervisorMessageSeen = true;
    }
  }

}

