import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";
import { Reflection } from "app/research/photons";
import { Globals } from "app/globals";
import { MachineService } from "app/services/machine.service";
import { MachineProperties } from "app/machines/machine";
import { LogService } from "../services/log.service";

export class FieldMirror extends ConstructionProject {

    constructor(universeService: UniverseService, logService: LogService) {
        super(
            "FieldMirror",
            "Field Mirror",
            "Allows more Philosophers",
            universeService, logService, 12.5, 1.5
        );
    }

    onComplete() {
        const eff = this.properties().efficiency * 10;
        this.universeService.universe.machines['PhotonicPhilosopher'].extras.maxAllowed += (5 * eff);
        this.machineService.addMachine(this);
    }

    onTick(tickFactor: number) {
        // do nothing, we function just by existing
    }

    preconditions(): boolean {
        return this.isResearched(new Reflection()) &&
            this.machineQuantity('Assembler') > 0;
    }

}
