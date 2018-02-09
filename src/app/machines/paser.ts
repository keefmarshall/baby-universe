import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { PhotonCollector } from "app/machines/photon-collector";
import { Globals } from "app/globals";
import { PhotonAmplification } from "app/research/amplification";

export class Paser extends ConstructionProject {
    baseStrangeQuarkCost = 2;

    constructor(
        universeService: UniverseService
    ) {
        super('Paser',
            "Paser",
            "Multiplies energy from photons by 10",
            universeService, 5000, 1.75);
    }

    onComplete() {
        const eff = this.properties().efficiency * 50; // efficiency starts at 0.1, so 5x multiplier
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
            quarkCostString = strangeCost + " anti strange quarks, " + topCost + " top quark";
        } else {
            quarkCostString = strangeCost + " strange quarks, " + topCost+ " anti top quark";
        }

        return super.displayCost(count) + ", " + quarkCostString +
            (this.topQuarkCost() > 1 ? "s" : "");
    }

    affordable(): boolean {
        const u = this.universeService.universe;
        let dqs: boolean, atqs: boolean;
        if (this.antiCycle()) {
            dqs = u.antiparticles['strange quark'] >= this.strangeQuarkCost();
            atqs = u.particles['top quark'] >= this.topQuarkCost();
        } else {
            dqs = u.particles['strange quark'] >= this.strangeQuarkCost();
            atqs = u.antiparticles['top quark'] >= this.topQuarkCost();
        }

        return super.affordable() && dqs && atqs;
    }

    payFor(count: number): boolean {
        if (this.affordable()) {
            // assume no race conditions, otherwise we'll have a ton of
            // nested ifs and we'll need to rollback on error
            const u = this.universeService.universe;
            if (this.antiCycle()) {
                u.antiparticles['strange quark'] -= this.strangeQuarkCost(count);
                u.particles['top quark'] -= this.topQuarkCost();
            } else {
                u.particles['strange quark'] -= this.strangeQuarkCost(count);
                u.antiparticles['top quark'] -= this.topQuarkCost();
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
