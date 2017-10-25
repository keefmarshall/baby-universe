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

    newMachine(name: string): Machine {
        switch (name) {
            case 'PhotonCollector': return new PhotonCollector();
            default: return null;
        }
    }

}
