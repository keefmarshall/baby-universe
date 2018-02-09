import { Machine } from "app/machines/machine";
import { UniverseService } from "app/services/universe.service";

export class ParadoxGenerator extends Machine {
    private baseCost = 2500;

    constructor(universeService: UniverseService) {
        super('ParadoxGenerator',
            "Paradox Generator",
            "Generate paradoxes to distract philosophers",
            universeService);
    }

    onTick(tickFactor: number) {
        // do nothing (for now - do something if distracting?)
    }

    preconditions(): boolean {
        return this.machineQuantity("PhotonicPhilosopher") > 0
            && this.machineQuantity("ParadoxGenerator") < 1; // there can be only 1
    }

    displayCost(count: number): string {
        return this.baseCost + " MeV";
    }

    payFor(count: number = 1): boolean {
        if (this.affordable()) {
            this.universeService.universe.energy -= this.baseCost;
            this.universeService.universe.logs.push(
                "Create a paradox only in times of need, it will cause your philosophers to lose focus.");
            return true;
        } else {
            return false;
        }
    }

    affordable(amount: number = 1): boolean {
        return (this.universeService.universe.energy >= this.baseCost);
    }
}
