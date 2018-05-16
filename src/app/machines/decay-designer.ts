import { ConstructionProject } from "./construction-project";
import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { MachineProperties } from "./machine";
import { DecayDesignService } from "../services/decay-design.service";

export class DecayDesigner extends ConstructionProject {

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private decayDesignService: DecayDesignService
     ) {
        super('DecayDesigner',
            "Decay Designer",
            "Designs patterns for radioactive decay",
            universeService,
            logService,
            3500, 1.08);
    }

    onTick(factor: number) {
        const amount = factor * this.properties().quantity * this.properties().efficiency * 0.1;
        this.decayDesignService.addProgress(amount);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    preconditions(): boolean {
        return this.machineQuantity("RadioactivityCentre") > 0;
    }

}
