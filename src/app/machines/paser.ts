import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { PhotonCollector } from "app/machines/photon-collector";
import { Globals } from "app/globals";
import { PhotonAmplification } from "app/research/amplification";

export class Paser extends ConstructionProject {

    constructor(
        universeService: UniverseService
    ) {
        super(Paser.name,
            "Paser",
            "Multiplies energy from photons by 10",
            universeService, 3000, Math.SQRT2);
    }

    onComplete() {
        this.universeService.universe.machines[PhotonCollector.name].efficiency *= 10;
        this.machineService.addMachine(this);
    }

    onTick() {
        // does nothing
    }

    preconditions(): boolean {
        return this.isResearched(new PhotonAmplification()) &&
            this.machineQuantity('Assembler') > 0;
    }

    // overrides

    downQuarkCost(count: number = 1): number {
        const q = this.properties().quantity;
        return Math.round(5 * Globals.geometricProgressionSum(q, q, 2));
    }

    // NB need to find a formula for this progression if we need to count more
    // can't be bothered right now, we're not using that feature yet
    topQuarkCost(): number {
        return this.properties().quantity + 1;
    }

    displayCost(count: number = 1): string {
        return super.displayCost(count) + ", " + 
            this.downQuarkCost(count) + " down quarks, " +
            this.topQuarkCost() + " anti top quark" +
            (this.topQuarkCost() > 1 ? "s" : "");
    }

    affordable(): boolean {
        const u = this.universeService.universe;
        const dqs = u.particles['down quark'] >= this.downQuarkCost();
        const atqs = u.antiparticles['top quark'] >= this.topQuarkCost();

        return super.affordable() && dqs && atqs;
    }

    payFor(count: number): boolean {
        if (this.affordable()) {
            // assume no race conditions, otherwise we'll have a ton of
            // nested ifs and we'll need to rollback on error
            const u = this.universeService.universe;
            u.particles['down quark'] -= this.downQuarkCost(count);
            u.antiparticles['top quark'] -= this.topQuarkCost();
            super.payFor(count);
            return true;
        } else {
            return false;
        }
    }
}
