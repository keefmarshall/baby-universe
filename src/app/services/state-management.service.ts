import { Injectable } from '@angular/core';
import { MachineFactory } from 'app/machines/machine-factory';
import { MachineService } from 'app/services/machine.service';
import { TickerService } from 'app/services/ticker.service';
import { UniverseService } from 'app/services/universe.service';
import { ConstructionService } from 'app/services/construction.service';
import { ConstructionProject } from 'app/machines/construction-project';
import { StargameService } from 'app/games/stargame/stargame.service';

/**
 * This service exists to break circular dependencies between 
 * projects/machines and various services. Specifically it allows
 * the MachineService to exist without a dependency on the
 * MachineFactory - so all references to machines in the Service
 * have to be externally injected.
 * 
 * This class takes care of restoring the correct state when the universe
 * is reset, or loaded from autosave. It ensures machines have the correct
 * state at all times.
 */
@Injectable()
export class StateManagementService {

  constructor(
    private constructionService: ConstructionService,
    private machineFactory: MachineFactory,
    private machineService: MachineService,
    private stargameService: StargameService,
    private tickerService: TickerService,
    private universeService: UniverseService
  ) {
    this.reloadUniverse();
    tickerService.tick$.subscribe(n => {
      this.updateMachineAvailability();
    });
  }

  reloadUniverse() {
    this.resetMachines();
    this.resetConstruction();
  }

  /**
   * Reload the current machines from the state of the universe
   */
  resetMachines() {
    console.log('Resetting machines..');

    this.machineFactory.resetMachines();

    const machineNames = [];
    const machines = [];

    console.log('Adding machine instances from store..');

    Object.keys(this.universeService.universe.machines).forEach(m => {
      const machine = this.machineFactory.newMachine(m);
      machines.push(machine);
      machineNames.push(m);
    });

    this.machineService.resetMachines(machines, machineNames);

    // console.log('Got machine instances: ' + JSON.stringify(machines));
    console.log('Rationalising machine availability against preconditions...');

    this.updateMachineAvailability();
  }

  resetConstruction() {
    const u = this.universeService.universe;
    if (u.currentConstructionProject != null) {
      console.log("Initialising construction project " + u.currentConstructionProject);

      const currentProject =
        this.machineFactory.newMachine(u.currentConstructionProject) as ConstructionProject;
      currentProject.setMachineService(this.machineService);
      const currentWork = u.currentConstructionWork;

      // NB don't call 'construct()' here as it will charge the fee again, using up
      // resources
      this.constructionService.currentProject = currentProject;

      console.log(".. adding construction work: " + currentWork);
      this.constructionService.addWork(currentWork);
    } else {
      console.log("No current construction project to initialise.");
    }
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
  updateMachineAvailability() {
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
      if (machine.canBuyMultiple) {
        machine.canBuy10 = machine.affordable(10);
        machine.canBuy20 = machine.affordable(20);
        machine.canBuy50 = machine.affordable(50);
      }
    });
  }

}
