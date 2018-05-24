import { ConstructionProject } from "./construction-project";
import { LogService } from "../services/log.service";
import { UniverseService } from "../services/universe.service";
import { RadioactiveDecay } from "../research/radioactivity";
import { RadioactivityService } from "../services/radioactivity.service";

export class RadioactivityCentre extends ConstructionProject {

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private radioactivityService: RadioactivityService
    ) {
        super(
            "RadioactivityCentre",
            "Radioactivity Centre",
            "A device to control your particle decay processes",
            universeService, logService, 5000, 1.1
        );
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick(tickFactor: number) {
        // do nothing - radioactivity service picks up the work
    }

    preconditions(): boolean {
        return this.isResearched(new RadioactiveDecay())
            && this.machineQuantity(this.name) < 1
    }

}
