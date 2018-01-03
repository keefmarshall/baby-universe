import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { Heat } from "app/research/kinetics2";
import { Meter } from "app/meters/meter";
import { Universe } from "app/services/universe";
import { MeteringService } from "app/services/metering.service";

export class Thermometer extends ConstructionProject implements Meter {
    private readonly boltzmann = 8.617e-11; // MeV per K (8.617e-5eV/K)
    meterValue: number;
    exponent: number;

    constructor(universeService: UniverseService,
         private meteringService: MeteringService) {
        super(
            "Thermometer",
            "Universal Thermometer",
            "Measures the temperature of the Universe",
            universeService, 200, 1.1
        );

        // bootstrap:
        if (this.machineQuantity("Thermometer") > 0) {
            this.meteringService.addMeter("thermometer", this);
        }
    }

    onComplete() {
        this.machineService.addMachine(this);
        this.meteringService.addMeter("thermometer", this);
    }

    onTick() {
        // do nothing (metering service already calls this.everySecond();
    }

    preconditions(): boolean {
        return this.isResearched(new Heat()) && this.machineQuantity(this.name) !== 1
    }

    everySecond(universe: Universe) {
        this.meterValue = universe.heat / this.boltzmann; // temp in K
        this.exponent = Math.floor(Math.log(this.meterValue) / Math.log(10));
    }

    addQuantity(n: number) {
        // not called
    }

}
