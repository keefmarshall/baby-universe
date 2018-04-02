import { ConstructionProject } from "./construction-project";
import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { ContrivanceService } from "../services/contrivance.service";
import { MachineProperties } from "./machine";

export class Bodger extends ConstructionProject {
    private repairProgress: number = 0;

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private contrivanceService: ContrivanceService
     ) {
        super('Bodger',
            "Bodger",
            "Repairs faulty contraptions.",
            universeService,
            logService,
            200, Math.SQRT2);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick(factor: number) {
        if (this.machineQuantity('Contraption') > 0 &&
             this.universeService.universe.machines['Contraption'].extras.faultyContraptions > 0) {
            const q = this.properties().quantity;
            this.repairProgress += (factor * q);
            const repairTicks = this.properties().extras['repairTicks'];
            const repairs = Math.floor(this.repairProgress / repairTicks);
            if (repairs > 0) {
                this.repairProgress -= (repairs * repairTicks);
                this.contrivanceService.repairContrivance(repairs);
            }
        }
    }

    preconditions(): boolean {
        return this.machineQuantity("Contraption") > 0 &&
            this.universeService.universe.machines['Contraption'].efficiency > 0.1;
    }

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.extras = {
            repairTicks: 10
        };
        return props;
    }
}
