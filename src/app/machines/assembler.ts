import { Machine } from "app/machines/machine";
import { Globals } from "app/globals";
import { KineticConstruction } from "app/research/kinetics";
import { UniverseService } from "app/services/universe.service";
import { ConstructionService } from "app/services/construction.service";

export class Assembler extends Machine {
    private baseEnergyCost = 3000;
    private costMultiplier = 1.05;

    constructor(universeService: UniverseService,
        private constructionService: ConstructionService
    ) {
        super(Assembler.name,
            "Assembler",
            "Converts stored energy to useful work",
            universeService);
    }

    // ////////////////////////////////
    // Abstract method implementations

    onTick() {
        // We only take energy and produce work while something is being built
        // which makes this a bit complex
        if (this.constructionService.isConstructing()) {
            // We take 1 energy per tick and lossily convert it to work.
            // The lost energy is converted to universal heat.
            const u = this.universeService.universe;
            if (u.energy < 1) {
                // do nothing, there's not enough for us to work!
                console.log("Assembler: not enough energy to work!");
            } else {
                // NB if efficiency goes above 10, we start taking heat from
                // the universe to work! Not sure if I'll use this.
                u.energy -= 1;
                const work = this.properties().efficiency * 0.1;
                u.heat += (1 - work);
                this.constructionService.addWork(work);
            }
        }
    }

    preconditions(): boolean {
        const kcres = 
            this.universeService.universe.research[new KineticConstruction().name];
        return kcres != null ? kcres.researched : false;
    }

    displayCost(count: number = 1): string {
        return Globals.round(this.energyCost(count), 1) + ' MeV';
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
            Globals.geometricProgressionSum(q, q + amount - 1, this.costMultiplier);

        return cost;
    }


}