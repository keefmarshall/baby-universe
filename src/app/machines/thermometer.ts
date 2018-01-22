import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { Heat } from "app/research/kinetics2";
import { Meter } from "app/meters/meter";
import { Universe } from "app/services/universe";
import { MeteringService } from "app/services/metering.service";
import { Globals } from "app/globals";

export class Thermometer extends ConstructionProject implements Meter {
    meterValue: number;
    exponent: number;

    constructor(universeService: UniverseService,
         private meteringService: MeteringService) {
        super(
            "Thermometer",
            "Universal Thermometer",
            "Measures the temperature of the Universe",
            universeService, 125, 1.1
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
        this.meterValue = universe.heat / Globals.boltzmann; // temp in K
        this.exponent = Math.floor(Math.log(this.meterValue) / Math.log(10));

        if (this.exponent >= 32 && universe.phase === 1) {
            // we're done with phase one, start big bang by changing universe state..
            this.universeService.universe.phase = 2;
            this.universeService.phase$.next(2);
        }
    }

    addQuantity(n: number) {
        // not called
    }

}
