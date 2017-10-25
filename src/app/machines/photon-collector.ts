import {Machine, MachineProperties} from './machine';
import {Universe} from '../services/universe';

export class PhotonCollector extends Machine {
    private photonCount = 0;

    constructor() {
        super(PhotonCollector.name);
    }

    onTick(universe: Universe, props: MachineProperties) {
        // n is the tick number, not the number of machines!

        // accumulate fractions of photons
        this.photonCount += props.quantity * props.efficiency;
        if (this.photonCount >= 1) { // we have at least one whole one
            const newPhotons = Math.floor(this.photonCount);
            console.log('Generated ' + newPhotons + ' new photons!');
            console.log('Energy per photon currently ' + universe.energyPerPhoton);
            this.photonCount -= newPhotons;
            universe.energy += newPhotons * universe.energyPerPhoton;
        }

    }

}
