import { ConstructionProject } from "./construction-project";
import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { HadronService } from "../services/hadron.service";
import { Protons, Neutrons } from "../research/matter2";
import { MachineProperties } from "./machine";
import { NumberFormatter } from "../util/number-formatter";

export class BaryonBuilder  extends ConstructionProject {
    private readonly pionBaseCost: number = 50;

    constructor(
        universeService: UniverseService,
        logService: LogService,
        private hadronService: HadronService
     ) {
        super('BaryonBuilder',
            "Baryon Builder",
            "Builds Baryons",
            universeService,
            logService,
            350, 1.05);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick(factor: number) {
        const eff = this.properties().efficiency * factor;
        const q = this.properties().quantity;
        const neutronAssigned = this.properties().extras['neutronAssigned'];
        const protonAssigned = q - neutronAssigned;

        this.hadronService.addProtonWork(eff * protonAssigned);
        this.hadronService.addNeutronWork(eff * neutronAssigned);
    }

    preconditions(): boolean {
        return this.isResearched(new Protons()) || this.isResearched(new Neutrons());
    }

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.efficiency = 0.01; // need room to improve
        props.extras = {
            neutronAssigned: 0
        };
        return props;
    }

    displayCost(count: number = 1): string {
        const pionCost = this.numberFormatter.abbreviateNumber(
            this.pionCost(), 4, false, "SI", true, true);
        const pionCostString = `${pionCost} π+, ${pionCost} π-`;
        return super.displayCost(count) + ", " + pionCostString;
    }

    affordable(): boolean {
        const u = this.universeService.universe;
        const pionCost = this.pionCost();
        const plusPions = u.particles['pion'] >= pionCost;
        const negPions = u.antiparticles['pion'] >= pionCost;
        return super.affordable() && plusPions && negPions;
    }

    payFor(count: number = 1): boolean {
        if (this.affordable()) {
            // assume no race conditions, otherwise we'll have a ton of
            // nested ifs and we'll need to rollback on error
            const u = this.universeService.universe;
            const pionCost = this.pionCost();
            u.particles['pion'] -= pionCost * count;
            u.antiparticles['pion'] -= pionCost * count;
            super.payFor(count);
            return true;
        } else {
            return false;
        }
    }

    private pionCost() {
        const q = this.properties().quantity;
        return Math.round(this.pionBaseCost * Math.pow(1.05, q));
    }

}
