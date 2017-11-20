import { Machine } from "app/machines/machine";
import { UniverseService } from "app/services/universe.service";
import { Quarks1 } from "app/research/matter";
import { ConstructionProject } from "app/machines/construction-project";
import { Globals } from "app/globals";
import { StargameService } from "app/games/stargame/stargame.service";

export class MatterDetector extends ConstructionProject {
    private readonly baseCost: number = 50;
    private readonly costMultiplier: number = 4;

    constructor(
        universeService: UniverseService,
        private stargameService: StargameService
    ) {
        super(MatterDetector.name,
            "Matter Detector",
            "Exposes more matter for collection",
            universeService);
    }


    onComplete() {
        // star game gets an extra star!
        this.stargameService.doStar();
        this.machineService.addMachine(this);
    }

    workCost(): number {
        const q = this.properties().quantity;
        return Globals.geometricProgressionSum(q, q, this.costMultiplier) * this.baseCost;
    }

    onTick() {
        // do nothing
    }

    preconditions(): boolean {
        return this.isResearched(new Quarks1()) &&
            this.properties().quantity < 4 && // can only have 4 (5 stars in total)
            this.machineQuantity('Assembler') > 0;
    }

    displayCost(count: number): string {
        return Globals.round(this.workCost(), 1) + " Work";
    }

    payFor(count: number): boolean {
        console.log("MatterDetector: payFor() called");
        return this.affordable();
    }
}
