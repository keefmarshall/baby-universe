import { ConstructionProject } from "./construction-project";
import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { DecayDesignService } from "../services/decay-design.service";
import { RadioactivityService } from "../services/radioactivity.service";
import { MachineProperties } from "./machine";
import { Globals } from "../globals";
import { DECAY_PATTERNS } from "../physics/decay-pattern";
import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core";

export class Bosonator extends ConstructionProject implements OnDestroy {
    private ticks = 0;
    private readonly tickFreq = 5; //
    private dsub: Subscription;

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

        // Ensure we don't get out of step - or if we do, a refresh will fix it.
        this.recalculateAvailable();
        this.populateAssignments();
        this.dsub = this.decayDesignService.events$.subscribe(() => this.populateAssignments());
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
        this.properties().extras['available'] ++;
    }

    preconditions(): boolean {
        return this.machineQuantity("RadioactivityCentre") > 0;
    }

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.extras = {
            available: 0,
            assignments: {} as { [key: string]: number } // particle: quantity
        };
        return props;
    }

    private recalculateAvailable() {
        const props = this.properties();
        let avail = props.quantity;
        Object.keys(props.extras['assignments']).forEach(p => {
            avail -= props.extras['assignments'][p];
        })
        props.extras['available'] = avail;
    }

    private populateAssignments() {
        const assignments = this.properties().extras['assignments'] as { [key: string]: number };
        this.universeService.universe.decayPatterns.forEach(pattID => {
            const pattern = DECAY_PATTERNS[pattID];
            if (pattern.inputs.length === 1 && !assignments[pattern.inputs[0]]) {
                assignments[pattern.inputs[0]] = 0;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.dsub) {
            this.dsub.unsubscribe();
        }
    }

}
