import { ConstructionProject } from "./construction-project";
import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { DecayDesignService } from "../services/decay-design.service";
import { RadioactivityService } from "../services/radioactivity.service";
import { MachineProperties } from "./machine";
import { Globals } from "../globals";

export class Bosonator extends ConstructionProject {
    private ticks = 0;
    private readonly tickFreq = 3; //

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private decayDesignService: DecayDesignService,
        private radioactivityService: RadioactivityService
     ) {
        super('Bosonator',
            "Bosonator",
            "Causes specific particles to decay via W bosons",
            universeService,
            logService,
            5000, 1.1);
    }

    onTick(factor: number) {
        this.ticks ++;
        // lower frequency of expensive calculations
        if (this.ticks % this.tickFreq === 0) {
            const multiplier = factor * this.tickFreq * this.properties().efficiency * Globals.secondsPerTick;
            const assignments = this.properties().extras['assignments'] as { [key: string]: number };
            Object.keys(assignments).forEach(particle => {
                this.radioactivityService.addProgress(particle, assignments[particle] * multiplier);
            });
        }
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    preconditions(): boolean {
        return this.machineQuantity("RadioactivityCentre") > 0;
    }

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.extras = {
            assignments: {} as { [key: string]: number } // particle: quantity
        };
        return props;
    }

}
