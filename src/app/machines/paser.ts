import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { PhotonCollector } from "app/machines/photon-collector";
import { Globals } from "app/globals";
import { PhotonAmplification } from "app/research/amplification";
import { LogService } from "../services/log.service";

export class Paser extends ConstructionProject {
    baseStrangeQuarkCost = 2;

    constructor(
        universeService: UniverseService,
        logService: LogService
    ) {
        super('Paser',
            "Paser",
            "Multiplies energy from photons (cumulative)",
            universeService, logService, 5000, 1.75);
    }

    onComplete() {
        const eff = this.properties().efficiency * 40; // efficiency starts at 0.1, so 4x multiplier
        this.universeService.universe.machines["PhotonCollector"].efficiency *= eff;
        this.machineService.addMachine(this);
    }

    onTick(tickFactor: number) {
        // does nothing
    }

    preconditions(): boolean {
        return this.isResearched(new PhotonAmplification()) &&
            this.machineQuantity('Assembler') > 0;
    }

    // overrides

    strangeQuarkCost(count: number = 1): number {
        const q = this.properties().quantity;
        return Math.round(
            this.baseStrangeQuarkCost * Globals.geometricProgressionSum(q, q, 2));
    }

    // NB need to find a formula for this progression if we need to count more
    // can't be bothered right now, we're not using that feature yet
    topQuarkCost(): number {
        return this.properties().quantity + 1;
    }

    displayCost(count: number = 1): string {
        let quarkCostString;
        const strangeCost = this.numberFormatter.numberWithCommas(this.strangeQuarkCost(count));
        const topCost = this.numberFormatter.numberWithCommas(this.topQuarkCost()) ;
        if (this.antiCycle()) {
            quarkCostString = strangeCost + " strange antiquarks, " + topCost + " top quark";
        } else {
            quarkCostString = strangeCost + " strange quarks, " + topCost + " top antiquark";
        }

        return super.displayCost(count) + ", " + quarkCostString +
            (this.topQuarkCost() > 1 ? "s" : "");
    }

    affordable(): boolean {
        const u = this.universeService.universe;
        let dqs: boolean, atqs: boolean;
        if (this.antiCycle()) {
            dqs = u.matter["s̅"] >= this.strangeQuarkCost();
            atqs = u.matter['t'] >= this.topQuarkCost();
        } else {
            dqs = u.matter['s'] >= this.strangeQuarkCost();
            atqs = u.matter["t̅"] >= this.topQuarkCost();
        }

        return super.affordable() && dqs && atqs;
    }

    payFor(count: number): boolean {
        if (this.affordable()) {
            // assume no race conditions, otherwise we'll have a ton of
            // nested ifs and we'll need to rollback on error
            const u = this.universeService.universe;
            if (this.antiCycle()) {
                u.matter["s̅"] -= this.strangeQuarkCost(count);
                u.matter['t'] -= this.topQuarkCost();
            } else {
                u.matter['s'] -= this.strangeQuarkCost(count);
                u.matter["t̅"] -= this.topQuarkCost();
            }
            super.payFor(count);
            return true;
        } else {
            return false;
        }
    }

    private antiCycle(): boolean {
        return this.properties().quantity % 2 === 0;
    }
}
