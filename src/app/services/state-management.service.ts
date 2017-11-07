import { Injectable } from '@angular/core';
import { MachineFactory } from 'app/machines/machine-factory';
import { MachineService } from 'app/services/machine.service';
import { TickerService } from 'app/services/ticker.service';
import { UniverseService } from 'app/services/universe.service';

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
    private machineFactory: MachineFactory,
    private machineService: MachineService,
    private tickerService: TickerService,
    private universeService: UniverseService
  ) {
    tickerService.tick$.subscribe(n => {

    });
  }

}
