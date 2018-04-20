import { ConstructionProject } from "./construction-project";
import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { MachineProperties } from "./machine";
import { RepeaterService } from "../services/repeater.service";

export class Repeater extends ConstructionProject {

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private repeaterService: RepeaterService
     ) {
        super('Repeater',
            "Repeater",
            "Causes contraptions to construct more of the same thing.",
            universeService,
            logService,
            1250, Math.SQRT2);
     }
 
    onComplete() {
        this.machineService.addMachine(this);
        this.repeaterService.init();
    }

    onTick(factor: number) {
        // do nothing, all managed via events
    }

    preconditions(): boolean {
        return this.machineQuantity("Repeater") === 0 && // only one
            this.machineQuantity("Contraption") > 0 &&
            this.universeService.universe.machines['Contraption'].efficiency > 0.5;
    }

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.extras = {
            on: false
        };
        return props;
    }
}
