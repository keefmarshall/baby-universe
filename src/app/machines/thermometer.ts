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

    onTick(tickFactor: number) {
        // do nothing (metering service already calls this.everySecond();
    }

    preconditions(): boolean {
        return this.isResearched(new Heat()) && this.machineQuantity(this.name) !== 1
    }

    everySecond(universe: Universe) {
        this.meterValue = universe.heat / Globals.boltzmann; // temp in K
        this.exponent = Math.floor(Math.log(this.meterValue) / Math.log(10));

        if (universe.phase === 1) {
            if (this.exponent >= 32) {
                // we're done with phase one, start big bang by changing universe state..
                universe.phase = 2;
                this.universeService.phase$.next(2);
            } else if (this.exponent >= 25 && !this.properties().extras['encmsg']) {
                // Message of encouragement
                this.properties().extras['encmsg'] = true;
                universe.logs.push("Your matter soup is getting warmer, but it's not hot enough yet!");
            }
        }
    }

    addQuantity(n: number) {
        // not called
    }

}
