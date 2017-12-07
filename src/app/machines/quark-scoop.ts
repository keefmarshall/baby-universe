import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { Quarks3, QuarkUtils } from "app/research/matter";
import { KineticConstruction } from "app/research/kinetics";
import { ParticleFactory } from "app/machines/particle-factory";
import { MachineProperties } from "app/machines/machine";

export class QuarkScoop extends ConstructionProject {
    private particleFactory = new ParticleFactory();
    private quarkUtils = new QuarkUtils();

    private accumulator = 0;

    private readonly upQuarkCost = 10;
    private readonly downQuarkCost = 5;

    constructor(
        universeService: UniverseService
    ) {
        super('QuarkScoop',
            "Quark Scoop",
            "Automatically collects quarks",
            universeService, 15000, 1.05);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick() {
        const u = this.universeService.universe;
        const quantity = this.properties().quantity;
        const eff = this.properties().efficiency;
        this.accumulator += quantity * eff;
        if (this.accumulator > 1) {
            const qn = Math.floor(this.accumulator);
            this.accumulator = this.accumulator - qn;

            for (let i = 0; i < qn; i++) {
                const quark = this.quarkUtils.randomQuark(u);
                this.particleFactory.collectQuark(u, quark);
            }
        }
    }

    preconditions(): boolean {
        return this.isResearched(new Quarks3()) &&
            this.isResearched(new KineticConstruction());
    }

    displayCost(count: number = 1): string {
        return super.displayCost(count) + ", " + 
            this.upQuarkCost + " up quarks, " +
            this.downQuarkCost + " anti down quarks";
    }

    affordable(): boolean {
        const u = this.universeService.universe;
        const uqs = u.particles['up quark'] >= this.upQuarkCost;
        const adqs = u.antiparticles['down quark'] >= this.downQuarkCost;

        return super.affordable() && uqs && adqs;
    }

    payFor(count: number): boolean {
        if (this.affordable()) {
            // assume no race conditions, otherwise we'll have a ton of
            // nested ifs and we'll need to rollback on error
            const u = this.universeService.universe;
            u.particles['up quark'] -= this.upQuarkCost * count;
            u.antiparticles['down quark'] -= this.downQuarkCost * count;
            super.payFor(count);
            return true;
        } else {
            return false;
        }
    }

}
