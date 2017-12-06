import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";
import { Reflection } from "app/research/photons";
import { Globals } from "app/globals";
import { MachineService } from "app/services/machine.service";
import { MachineProperties } from "app/machines/machine";

export class FieldMirror extends ConstructionProject {

    constructor(universeService: UniverseService) {
        super(
            "FieldMirror",
            "Field Mirror",
            "Allows more Philosophers",
            universeService, 12.5, 2
        );
    }

    onComplete() {
        this.universeService.universe.machines['PhotonicPhilosopher'].extras.maxAllowed += 5;
        this.machineService.addMachine(this);
    }

    onTick() {
        // do nothing, we function just by existing
    }

    preconditions(): boolean {
        return this.isResearched(new Reflection()) && 
            this.machineQuantity('Assembler') > 0;
    }

}
