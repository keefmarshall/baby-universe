import { ConstructionProject } from "./construction-project";
import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { ContrivanceService } from "../services/contrivance.service";

export class Contriver extends ConstructionProject {
    private readonly ticksPerStep: number = 50;
    private contrivingProgress: number = 0;

    constructor(
        universeService: UniverseService,
        logService: LogService  ,
        private contrivanceService: ContrivanceService
     ) {
        super('Contriver',
            "Auto Contriver",
            "Contrives contraptions. Slowly.",
            universeService,
            logService,
            2500, 1.75);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick(factor: number) {
        const q = this.properties().quantity;
        this.contrivingProgress += (factor * q);
        const steps = Math.floor(this.contrivingProgress / this.ticksPerStep);
        if (steps > 0) {
            this.contrivanceService.buildContrivance(steps);
            this.contrivingProgress -= steps * this.ticksPerStep;
        }
    }

    preconditions(): boolean {
        return this.machineQuantity("Contraption") > 0 &&
            this.universeService.universe.machines['Contraption'].efficiency >= 1.000;
    }

}
