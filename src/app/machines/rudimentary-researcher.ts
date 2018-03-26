import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { ResearchService } from "../services/research.service";
import { Globals } from "../globals";
import { ConstructionProject } from "./construction-project";
import { MachineProperties } from "./machine";

export class RudimentaryResearcher extends ConstructionProject {

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private researchService: ResearchService
     ) {
        super('RudimentaryResearcher',
            "Rudimentary Researcher",
            "Conducts scientific research. Slowly.",
            universeService,
            logService,
            10, 1.05);
    }

    onTick(tickFactor: number) {
        const science = this.properties().quantity * this.properties().efficiency * tickFactor;
        this.researchService.addScience(science);
    }

    preconditions(): boolean {
        return this.machineQuantity('Contraption') > 0;
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.extras = {
            researchImprovement: 0,
            contraptionImprovement: 0
        };
        return props;
    }

}
