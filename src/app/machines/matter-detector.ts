import { UniverseService } from "app/services/universe.service";
import { Quarks1 } from "app/research/matter";
import { ConstructionProject } from "app/machines/construction-project";
import { Globals } from "app/globals";
import { StargameService } from "app/games/stargame/stargame.service";
import { LogService } from "../services/log.service";

export class MatterDetector extends ConstructionProject {

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private stargameService: StargameService
    ) {
        super('MatterDetector',
            "Matter Detector",
            "Exposes more matter for collection",
            universeService, logService, 25, 2);
    }


    onComplete() {
        // star game gets an extra star!
        this.stargameService.doStar();
        this.machineService.addMachine(this);
    }

    onTick(tickFactor: number) {
        // do nothing
    }

    preconditions(): boolean {
        return this.isResearched(new Quarks1()) &&
            this.properties().quantity < 4 && // can only have 4 (5 stars in total)
            this.machineQuantity('Assembler') > 0;
    }

}
