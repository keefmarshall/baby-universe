import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";
import { Reflection } from "app/research/photons";
import { Assembler } from "app/machines/assembler";

export class FieldMirror extends ConstructionProject{
    private baseCost: number = 25;

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
    }

    workCost(): number {
        return this.baseCost;
    }

    onTick() {
        // do nothing, we function just by existing
    }

    preconditions(): boolean {
        return this.isResearched(new Reflection()) && 
            this.machineQuantity(Assembler.name) > 0;
    }

    displayCost(count: number): string {
        return this.baseCost + " Work";
    }

    payFor(count: number): boolean {
        return this.affordable();
    }
}
