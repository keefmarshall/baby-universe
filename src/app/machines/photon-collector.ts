import {Machine, MachineProperties} from './machine';
import { Universe } from '../services/universe';

import { ParticleFactory } from './particle-factory';

export class PhotonCollector extends Machine {
    private photonCount = 0;
    private particleFactory = new ParticleFactory();
    
    constructor() {
        super(PhotonCollector.name);
    }

    onTick(universe: Universe, props: MachineProperties) {
        // n is the tick number, not the number of machines!

        // accumulate fractions of photons
        this.photonCount += props.quantity * props.efficiency;
        if (this.photonCount >= 1) { // we have at least one whole one
            const newPhotons = Math.floor(this.photonCount);
            this.photonCount -= newPhotons;

            for (let i = 0; i < newPhotons; i++) {
                this.particleFactory.collectPhoton(universe);
            }
            // universe.photonCount += newPhotons;
            // universe.energy += newPhotons * universe.energyPerPhoton;
        }

    }

    preconditions(universe: Universe): boolean {
        return universe.photonCount >= 10;
    }
}
