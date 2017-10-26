import {Machine} from './machine';

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
export class MachineFactory {
    allMachines = [
        'PhotonCollector'
    ];

    newMachine(name: string): Machine {
        console.log('Building machine of type ' + name);
        switch (name) {
            case 'PhotonCollector': 
                console.log('Building photon collector..');
                return new PhotonCollector();

            default: 
                return null;
        }
    }

}
