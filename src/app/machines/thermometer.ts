import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { Heat } from "app/research/kinetics2";
import { Meter } from "app/meters/meter";
import { Universe } from "app/services/universe";
import { MeteringService } from "app/services/metering.service";
import { Globals } from "app/globals";
import { LogService } from "../services/log.service";
import { PlasmaShockService } from "../services/plasma-shock.service";

export class Thermometer extends ConstructionProject implements Meter {
    meterValue: number;
    exponent: number;
    phase1Progress: number = 0; // percentage complete 0->100

    private readonly phase1Max: number;

    constructor(universeService: UniverseService,
        logService: LogService,
        private meteringService: MeteringService,
        private plasmaShockService: PlasmaShockService
    ) {
        super(
            "Thermometer",
            "Universal Thermometer",
            "Measures the temperature of the Universe",
            universeService, logService, 125, 1.1
        );

        // bootstrap:
        if (this.machineQuantity("Thermometer") > 0) {
            this.meteringService.addMeter("thermometer", this);
        }

        this.phase1Max = this.phase1ProgressCalc(1e32);
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

        this.phase1Progress = this.phase1ProgressCalc(this.meterValue) * 100 / this.phase1Max;

        if (universe.phase <= 1) {
            if (this.exponent >= 32) {
                // we're done with phase one, start big bang by changing universe state..
                this.universeService.transitionToPhase(1.5);
            } else if (this.exponent >= 25 && !this.properties().extras['encmsg']) {
                // Message of encouragement
                this.properties().extras['encmsg'] = true;
                this.logService.addLog("Your matter soup is getting warmer, but you feel it can get hotter still.");
                this.plasmaShockService.shockLevel++;
                this.plasmaShockService.start();
            } else if (this.exponent >= 28 && !this.properties().extras['encmsg2']) {
                // Message of encouragement
                this.properties().extras['encmsg2'] = true;
                this.logService.addLog("The plasma maelstrom seethes and bubbles as it grows hotter still; chaos incarnate.");
                this.plasmaShockService.shockLevel++;
            } else if (this.exponent >= 30 && !this.properties().extras['encmsg3']) {
                // Message of encouragement
                this.properties().extras['encmsg3'] = true;
                this.logService.addLog("The machines are starting to struggle as the temperature rises further.");
                this.plasmaShockService.shockLevel++;
            } else if (this.exponent >= 31 && !this.properties().extras['encmsg4']) {
                // Message of encouragement
                this.properties().extras['encmsg4'] = true;
                this.logService.addLog("Ripples of pure energy course through your proto-universe as it gets closer to... what?");
                this.plasmaShockService.shockLevel++;
            }
        }
    }

    phase1ProgressCalc(n: number): number {
        const x = Math.log10(n);
        return x * Math.pow(1.1, x);
    }

    addQuantity(n: number) {
        // not called
    }

}
