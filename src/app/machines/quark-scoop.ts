import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { Quarks3, QuarkUtils } from "app/research/matter";
import { ParticleFactory } from "app/machines/particle-factory";
import { MachineProperties } from "app/machines/machine";
import { Globals } from "app/globals";
import { KineticEngineering } from "app/research/kinetics2";

export class QuarkScoop extends ConstructionProject {
    private particleFactory = new ParticleFactory();
    private quarkUtils = new QuarkUtils();

    private accumulator = 0;

    private readonly upQuarkBaseCost = 20;
    private readonly downQuarkBaseCost = 10;

    constructor(
        universeService: UniverseService
    ) {
        super('QuarkScoop',
            "Quark Scoop",
            "Automatically collects quarks",
            universeService, 15000, 1.1);
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

            const funnelCount = this.machineQuantity("MatterFunnel");

            // TODO: this is going to get crazy when efficiency rises
            // - need to do a random distribution calculation I think,
            // and add many multiples at once.
            for (let i = 0; i < qn; i++) {
                const quark = this.quarkUtils.randomQuark(u);
                const q = Math.max(1, (funnelCount * 100));
                this.particleFactory.collectQuark(u, quark, q);
            }
        }
    }

    preconditions(): boolean {
        return this.isResearched(new Quarks3()) &&
            this.isResearched(new KineticEngineering());
    }

    upQuarkCost() {
        const q = this.properties().quantity;
        return Math.round(this.upQuarkBaseCost + (2 * Math.pow(q, 1.8)));
    }

    downQuarkCost() {
        const q = this.properties().quantity;
        return Math.round(this.downQuarkBaseCost + Math.pow(q, 1.8));
    }


    displayCost(count: number = 1): string {
        let quarkCostString: string;
        if (this.antiCycle()) {
            quarkCostString = this.upQuarkCost() + " anti up quarks, " +
                this.downQuarkCost() + " down quarks";
        } else {
            quarkCostString = this.upQuarkCost() + " up quarks, " +
                this.downQuarkCost() + " anti down quarks";
        }
        return super.displayCost(count) + ", " + quarkCostString;
    }

    affordable(): boolean {
        const u = this.universeService.universe;
        let uqs: boolean, adqs: boolean;
        if (this.antiCycle()) {
            uqs = u.antiparticles['up quark'] >= this.upQuarkCost();
            adqs = u.particles['down quark'] >= this.downQuarkCost();
        } else {
            uqs = u.particles['up quark'] >= this.upQuarkCost();
            adqs = u.antiparticles['down quark'] >= this.downQuarkCost();
        }
        return super.affordable() && uqs && adqs;
    }

    payFor(count: number = 1): boolean {
        if (this.affordable()) {
            // assume no race conditions, otherwise we'll have a ton of
            // nested ifs and we'll need to rollback on error
            const u = this.universeService.universe;
            if (this.antiCycle()) {
                u.antiparticles['up quark'] -= this.upQuarkCost() * count;
                u.particles['down quark'] -= this.downQuarkCost() * count;
            } else {
                u.particles['up quark'] -= this.upQuarkCost() * count;
                u.antiparticles['down quark'] -= this.downQuarkCost() * count;
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
