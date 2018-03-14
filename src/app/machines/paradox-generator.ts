import { Machine } from "app/machines/machine";
import { UniverseService } from "app/services/universe.service";
import { LogService } from "../services/log.service";

export class ParadoxGenerator extends Machine {
    private baseCost = 2500;

    constructor(universeService: UniverseService, logService: LogService) {
        super('ParadoxGenerator',
            "Paradox Generator",
            "Generate paradoxes to distract philosophers",
            universeService, logService);
    }

    onTick(tickFactor: number) {
        // do nothing (for now - do something if distracting?)
    }

    preconditions(): boolean {
        return this.machineQuantity("PhotonicPhilosopher") > 0
            && this.machineQuantity("ParadoxGenerator") < 1; // there can be only 1
    }

    displayCost(count: number): string {
        // return this.baseCost + " MeV";
        return this.numberFormatter.abbreviateNumber(this.baseCost * 1e6) + 'eV';
    }

    payFor(count: number = 1): boolean {
        if (this.affordable()) {
            this.universeService.universe.energy -= this.baseCost;
            this.logService.addLog(
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
