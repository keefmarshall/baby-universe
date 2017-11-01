import { Globals } from '../globals';

import {Machine, MachineProperties} from './machine';
import { Universe } from '../services/universe';
import { UniverseService } from '../services/universe.service';

import { ParticleFactory } from './particle-factory';

export class PhotonCollector extends Machine {
    private photonCount = 0;
    private particleFactory = new ParticleFactory();

    private readonly baseEnergyCost = 5;
    private readonly costMultipler = 1.1;


    constructor(universeService: UniverseService) {
        super(PhotonCollector.name,
            "Photon Collector",
            "Converts stray photons into energy",
            universeService);
    }

    // ////////////////////////////////
    // Abstract method implementations

    onTick() {
        // accumulate fractions of photons
        const props = this.properties();
        this.photonCount += props.quantity * props.efficiency;
        if (this.photonCount >= 1) { // we have at least one whole one
            const newPhotons = Math.floor(this.photonCount);
            this.photonCount -= newPhotons;
            this.particleFactory.collectPhoton(
                this.universeService.universe, newPhotons);
        }
    }

    preconditions(): boolean {
        return this.universeService.universe.photonCount >= 10;
    }

    displayCost(amount: number = 1): string {
        return Globals.round(this.energyCost(amount), 1) + ' MeV';
    }

    payFor(amount: number = 1): boolean {
        const cost = this.energyCost(amount);
        if (this.affordable(amount)) {
            this.universeService.universe.energy -= cost;
            return true;
        } else {
            return false;
        }
    }

    affordable(amount: number = 1): boolean {
        return this.universeService.universe.energy >= this.energyCost(amount);
    }

    // ////////////////////////////////
    // Internal functions

    energyCost(amount: number = 1): number {
        const q = this.properties().quantity || 0;

        const cost = this.baseEnergyCost *
            Globals.geometricProgressionSum(q, q + amount - 1, this.costMultipler);

        return cost;
    }
}
