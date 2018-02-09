import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { QuantumElectrodynamics } from "app/research/collection";

export class MatterFunnel extends ConstructionProject {

    constructor(
        universeService: UniverseService
    ) {
        super('MatterFunnel',
            "Matter Funnel",
            "Focus quarks from a wide area (max 1 per scoop)",
            universeService, 50000, 1.1);
    }

    onComplete() {
        this.machineService.addMachine(this);
        if (this.properties().quantity === 10) {
            this.universeService.universe.logs.push(
                "Use Particle Attractors to increase collection.");
        }
    }

    onTick(tickFactor: number) {
        // do nothing - calculation is applied in Quark Scoop machine code
    }

    affordable(): boolean {
        const qsc = this.machineQuantity("QuarkScoop");
        const mfc = this.machineQuantity("MatterFunnel");
        return super.affordable() && qsc > mfc;
    }

    preconditions(): boolean {
        return this.isResearched(new QuantumElectrodynamics()) &&
            this.properties().quantity < 20; // can only have 20
    }

}
