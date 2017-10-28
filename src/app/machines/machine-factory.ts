import { Injectable } from '@angular/core';

import { UniverseService } from '../services/universe.service';

import { Machine } from './machine';

// Tediously import every bloody machine
import { PhotonCollector } from './photon-collector';

/**
 * This class exists solely so we can reconstruct a machine based on
 * the machine name alone. It essentially just maps names to classes.
 *
 * You don't need to use this if you already know the class of the machine.
 *
 * Any machine that can be added to the machine service has to be represented
 * here, otherwise we can't recover from a saved state correctly.
 */
@Injectable()
export class MachineFactory {
    allMachines: {};

    constructor(private universeService: UniverseService) {
        this.allMachines = {
            'PhotonCollector': new PhotonCollector(universeService)
        };
    }

    newMachine(name: string): Machine {
        // console.log('Building machine of type ' + name);
        return this.allMachines[name];
    }

}