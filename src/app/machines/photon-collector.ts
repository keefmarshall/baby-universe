import { Globals } from '../globals';

import {Machine, MachineProperties} from './machine';
import { Universe } from '../services/universe';
import { UniverseService } from '../services/universe.service';

import { ParticleFactory } from './particle-factory';
import { LogService } from '../services/log.service';

export class PhotonCollector extends Machine {
    private photonCount = 0;
    private particleFactory = new ParticleFactory();

    private readonly baseEnergyCost = 5;
    private readonly costMultipler = 1.1;


    constructor(universeService: UniverseService,
        logService: LogService) {
        super('PhotonCollector',
            "Photon Collector",
            "Converts stray photons into energy",
            universeService,
            logService,
            true);
    }

    // ////////////////////////////////
    // Abstract method implementations

    onTick(tickFactor: number) {
        // accumulate fractions of photons
        const props = this.properties();
        this.photonCount += props.quantity * props.efficiency * tickFactor;
        if (this.photonCount >= 1) { // we have at least one whole one
            const newPhotons = Math.floor(this.photonCount);
            this.photonCount -= newPhotons;
            this.particleFactory.collectPhoton(
                this.universeService.universe, this.logService, newPhotons);
        }
    }

    preconditions(): boolean {
        return this.universeService.universe.photonCount >= 10;
    }

    displayCost(amount: number = 1): string {
        // return Globals.round(this.energyCost(amount), 1) + ' MeV';
        // const tmp = this.energyCost(1);
        // const tmp2 = this.energyCost(amount);
        return this.numberFormatter.abbreviateNumber(this.energyCost(amount) * 1e6) + 'eV';
    }

    payFor(amount: number = 1): boolean {
        const cost = this.energyCost(amount);
        if (this.affordable(amount)) {
            this.universeService.universe.energy -= cost;

            const q = this.properties().quantity || 0;
            if (q === 9) {
                this.universeService.universe.logs.push(
                    "The light of the void can help unlock a myriad of possibilities."
                );
            }

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
