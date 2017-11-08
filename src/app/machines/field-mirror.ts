import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";
import { Reflection } from "app/research/photons";
import { Globals } from "app/globals";
import { MachineService } from "app/services/machine.service";
import { MachineProperties } from "app/machines/machine";

export class FieldMirror extends ConstructionProject {
    private baseCost: number = 12.5;
    private costMultiplier: number = 2;

    constructor(universeService: UniverseService) {
        super(
            "FieldMirror",
            "Field Mirror",
            "Allows more Philosophers",
            universeService
        )
    }

    onComplete() {
        this.universeService.universe.machines[PhotonicPhilosopher.name].extras.maxAllowed += 5;
        this.machineService.addMachine(this);
    }

    workCost(): number {
        const q = this.properties().quantity;
        return Globals.geometricProgressionSum(q, q, this.costMultiplier) * this.baseCost;
    }

    onTick() {
        // do nothing, we function just by existing
    }

    preconditions(): boolean {
        return this.isResearched(new Reflection()) && 
            this.machineQuantity('Assembler') > 0;
    }

    displayCost(count: number): string {
        return Globals.round(this.workCost(), 1) + " Work";
    }

    payFor(count: number): boolean {
        return this.affordable();
    }

}
