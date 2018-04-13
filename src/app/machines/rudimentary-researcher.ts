import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { ResearchService } from "../services/research.service";
import { Globals } from "../globals";
import { ConstructionProject } from "./construction-project";
import { MachineProperties } from "./machine";
import { ResearchTrackService } from "../services/research-track.service";

export class RudimentaryResearcher extends ConstructionProject {

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private researchService: ResearchService,
        private researchTrackService: ResearchTrackService
     ) {
        super('RudimentaryResearcher',
            "Rudimentary Researcher",
            "Conducts scientific research. Slowly.",
            universeService,
            logService,
            2, 1.1);
    }

    onTick(tickFactor: number) {
        const eff = this.properties().efficiency;
        const numImprove = this.properties().extras['researchImprovement'];
        const numContrap = this.properties().extras['contraptionImprovement'];
        const numAssigned = numImprove + numContrap;

        const numOnProjects = this.properties().quantity - numAssigned;
        const science = numOnProjects * eff * tickFactor * 0.1;
        this.researchService.addScience(science);

        // Assignments
        const assignmentEff = 2 * Math.log10(eff + 1);
        const improveScience = numImprove * assignmentEff * tickFactor * 0.1;
        this.researchTrackService.improveResearchers(improveScience);

        const contrapScience = numContrap * assignmentEff * tickFactor * 0.1;
        this.researchTrackService.improveContraptions(contrapScience);
    }

    preconditions(): boolean {
        return this.machineQuantity('Contraption') > 0;
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.efficiency = 0.01;
        props.extras = {
            researchImprovement: 0,
            contraptionImprovement: 0
        };
        return props;
    }

}
