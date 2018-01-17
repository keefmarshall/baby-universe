import { Assembler } from "app/machines/assembler";
import { UniverseService } from "app/services/universe.service";
import { ConstructionService } from "app/services/construction.service";
import { MeteringService } from "app/services/metering.service";
import { ConstructionProject } from "app/machines/construction-project";
import { KineticEngineering } from "app/research/kinetics2";

export class AssemblyPlant extends ConstructionProject {
    // protected baseEnergyDraw = 100;
    private assemblerCost = 10; // 10 Assemblers make a Plant

    constructor(universeService: UniverseService,
        private constructionService: ConstructionService,
        private meteringService: MeteringService
    ) {
        super('AssemblyPlant',
            "Assembly Plant",
            "Combines assemblers to draw 10x energy",
            universeService, 2500, 1.2);
    }

    // cut-and-paste from Assembler, can't find easy way to share the code
    // - we can't just extend Assembler as this has to be a construction project
    // - could factor out into a Utils class but there's a ton of dependencies
    onTick() {
        // We only take energy and produce work while something is being built
        // which makes this a bit complex
        if (this.constructionService.isConstructing()) {
            // We take 1 energy per tick and lossily convert it to work.
            // The lost energy is converted to universal heat.
            const u = this.universeService.universe;
            const q = this.properties().quantity;
            const eff = this.universeService.universe.machines['Assembler'].efficiency;
            const baseEnergyDraw = this.universeService.universe.machines['Assembler'].extras['energyDraw'] * 100;
            const energyDraw = baseEnergyDraw * q;
            if (u.energy < energyDraw) {
                // do nothing, there's not enough for us to work!
                console.log("Assembly Plant: not enough energy to work!");
            } else {
                // NB if efficiency goes above 10, we start taking heat from
                // the universe to work! Not sure if I'll use this.
                u.energy -= energyDraw;
                const work = eff * energyDraw * 0.1;
                u.heat += (energyDraw - work);
                this.constructionService.addWork(work);
                this.meteringService.addQuantity('construction-energy-cost', energyDraw);
                this.meteringService.addQuantity('work', work);
            }
        }
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    preconditions(): boolean {
        return this.isResearched(new KineticEngineering()) &&
            this.machineQuantity('Paser') > 0;
    }

    displayCost(count: number = 1): string {
        return super.displayCost(count) + ", " + this.assemblerCost + " Assemblers";
    }

    affordable(): boolean {
        return super.affordable() &&
            this.machineQuantity('Assembler') > this.assemblerCost;
    }

    payFor(count: number): boolean {
        if (this.affordable()) {
            // assume no race conditions, otherwise we'll have a ton of
            // nested ifs and we'll need to rollback on error
            const u = this.universeService.universe;
            u.machines['Assembler'].quantity -= this.assemblerCost;
            super.payFor(count);
            return true;
        } else {
            return false;
        }
    }

}
