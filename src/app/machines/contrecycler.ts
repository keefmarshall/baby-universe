import { ConstructionProject } from "./construction-project";
import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { ContrivanceService } from "../services/contrivance.service";
import { MachineProperties } from "./machine";

export class Contrecycler extends ConstructionProject {
    private salvageProgress: number = 0;

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private contrivanceService: ContrivanceService
     ) {
        super('Contrecycler',
            "Contraption Recycler",
            "Salvages broken contraptions.",
            universeService,
            logService,
            40, Math.SQRT2);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick(factor: number) {
        if (this.machineQuantity('Contraption') > 0 &&
             this.universeService.universe.machines['Contraption'].extras.brokenContraptions > 0) {
            this.salvageProgress += factor;
            const salvageTicks = this.properties().extras['salvageTicks'];
            const salvages = Math.floor(this.salvageProgress / salvageTicks);
            if (salvages > 0) {
                this.salvageProgress -= (salvages * salvageTicks);
                this.contrivanceService.salvageContrivance(salvages);
            }
        }
    }

    preconditions(): boolean {
        return this.machineQuantity("Contrecycler") === 0 && // only one, for now
            this.machineQuantity("Contraption") > 0 &&
            this.universeService.universe.machines['Contraption'].efficiency > 0.02;
    }

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.extras = {
            salvageTicks: 50
        };
        return props;
    }

}
