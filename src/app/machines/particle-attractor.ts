import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { LogService } from "../services/log.service";

export class ParticleAttractor extends ConstructionProject {

    constructor(
        universeService: UniverseService,
        logService: LogService
    ) {
        super('ParticleAttractor',
            "Particle Attractor",
            "Increase effectiveness of Matter Funnels",
            universeService, logService, 250000, 1.2);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick(tickFactor: number) {
        // do nothing - calculation is applied in Quark Scoop machine code
    }

    preconditions(): boolean {
        return this.machineQuantity('MatterFunnel') >= 10;
    }
}
