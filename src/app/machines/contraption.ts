import { Machine, MachineProperties } from "./machine";
import { LogService } from "../services/log.service";
import { UniverseService } from "../services/universe.service";
import { ConstructionService } from "../services/construction.service";

export class Contraption extends Machine {

    constructor(universeService: UniverseService,
        logService: LogService,
        private constructionService: ConstructionService
    ) {
        super('Contraption',
            "Contraption",
            "A makeshift construction tool",
            universeService,
            logService);
    }

    /**
     * This is basically a simpler Assembler
     */
    onTick(factor: number) {
        if (this.constructionService.isConstructing()) {
            const q = this.properties().extras['workingContraptions']
                + (this.properties().extras['faultyContraptions'] / 2);
            const eff = this.properties().efficiency;
            const work = eff * q;
            this.constructionService.addWork(work);
            this.universeService.universe.heat -= work; // will have no effect but this is science!
        }
    }

    preconditions(): boolean {
        return false; // can never just deploy through a button
        // return this.universeService.universe.phase > 1.5;
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

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.extras = {
            workingContraptions: 0,
            faultyContraptions: 0, // faulty are repairable
            brokenContraptions: 0 // broken can be salvaged for steps towards a new machine          
        };
        return props;
    }
}
