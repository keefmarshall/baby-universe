import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";
import { Reflection } from "app/research/photons";
import { Globals } from "app/globals";

export class FieldMirror extends ConstructionProject{
    private baseCost: number = 25;
    private costMultiplier: number = 1.1;

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
        const q = this.properties().quantity;
        console.log("Calculating cost for " + q + " field mirrors");
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
        return this.workCost() + " Work";
    }

    payFor(count: number): boolean {
        return this.affordable();
    }

}
