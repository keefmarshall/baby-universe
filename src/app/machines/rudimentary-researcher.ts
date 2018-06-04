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
        const numContrapStr = this.properties().extras['contraptionStrengthImprovement'];
        const numMaker = this.properties().extras['makerImprovement'];
        const numBuilder = this.properties().extras['builderImprovement'];
        const numAssigned = numImprove + numContrap + numMaker + numBuilder + numContrapStr;

        const numOnProjects = this.properties().quantity - numAssigned;
        const science = numOnProjects * eff * tickFactor * 0.1;
        this.researchService.addScience(science);

        // Assignments
        const assignmentEff = 2 * Math.log10(eff + 1);
        const multiplier = assignmentEff * tickFactor * 0.1;

        this.researchTrackService.improveResearchers(numImprove * multiplier);
        this.researchTrackService.improveContraptions(numContrap * multiplier);
        this.researchTrackService.improveMakers(numMaker * multiplier);
        this.researchTrackService.improveBuilders(numBuilder * multiplier);
        this.researchTrackService.improveContraptionStrength(numContrapStr * multiplier);
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
            contraptionImprovement: 0,
            contraptionStrengthImprovement: 0,
            makerImprovement: 0,
            builderImprovement: 0
        };
        return props;
    }

}
