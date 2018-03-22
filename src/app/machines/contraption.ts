import { Machine } from "./machine";
import { LogService } from "../services/log.service";
import { UniverseService } from "../services/universe.service";

export class Contraption extends Machine {

    constructor(universeService: UniverseService,
        logService: LogService) {
        super('Contraption',
            "Contraption",
            "A makeshift construction tool",
            universeService,
            logService);
    }

    onTick(factor: number) {
        // TODO: produce work.
    }

    preconditions(): boolean {
        return this.universeService.universe.phase > 1.5;
    }

    displayCost(count: number): string {
        return "";
    }

    payFor(count: number): boolean {
        return true;
    }

    affordable(amount: number): boolean {
        return true;
    }
}
