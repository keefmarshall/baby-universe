import { ConstructionProject } from "./construction-project";
import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { Pions } from "../research/matter2";
import { MachineProperties } from "./machine";
import { HadronService } from "../services/hadron.service";

/**
 * NB this can only manufacture Pions and Kaons, we're not going
 * to bother with all the other random types, they have too short
 * a half life.
 */
export class MesonMaker extends ConstructionProject {

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private hadronService: HadronService
     ) {
        super('MesonMaker',
            "Meson Maker",
            "Manufactures Mesons",
            universeService,
            logService,
            50, 1.05);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick(factor: number) {
        const eff = this.properties().efficiency * factor;
        const q = this.properties().quantity;
        const kaonAssigned = this.properties().extras['kaonAssigned'];
        const pionAssigned = q - kaonAssigned;

        this.hadronService.addPionWork(eff * pionAssigned);
        this.hadronService.addKaonWork(eff * kaonAssigned);
    }

    preconditions(): boolean {
        return this.isResearched(new Pions());
    }

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.efficiency = 0.01; // need room to improve
        props.extras = {
            kaonAssigned: 0
        };
        return props;
    }
}
