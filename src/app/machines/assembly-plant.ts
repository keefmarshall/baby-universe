import { Assembler } from "app/machines/assembler";
import { UniverseService } from "app/services/universe.service";
import { ConstructionService } from "app/services/construction.service";
import { MeteringService } from "app/services/metering.service";
import { ConstructionProject } from "app/machines/construction-project";
import { KineticEngineering } from "app/research/kinetics2";
import { ResearchService } from "app/services/research.service";
import { IntelligentAssembly } from "app/research/photons";

export class AssemblyPlant extends ConstructionProject {
    // protected baseEnergyDraw = 100;
    private assemblerCost = 10; // 10 Assemblers make a Plant

    constructor(universeService: UniverseService,
        private constructionService: ConstructionService,
        private meteringService: MeteringService,
        private researchService: ResearchService
    ) {
        super('AssemblyPlant',
            "Assembly Plant",
            "Combines assemblers to increase energy draw",
            universeService, 2500, 1.2);
    }

    // cut-and-paste from Assembler, can't find easy way to share the code
    // - we can't just extend Assembler as this has to be a construction project
    // - could factor out into a Utils class but there's a ton of dependencies
    onTick(tickFactor: number) {
        // We only take energy and produce work while something is being built
        // which makes this a bit complex
        if (this.constructionService.isConstructing()) {
            // We take 1 energy per tick and lossily convert it to work.
            // The lost energy is converted to universal heat.
            const u = this.universeService.universe;
            const q = this.properties().quantity;
            const eff = this.universeService.universe.machines['Assembler'].efficiency;
            const boost = this.universeService.universe.machines['AssemblyPlant'].efficiency * 300; // efficiency starts at 0.1 so this is 30x
            
            const baseEnergyDraw = this.universeService.universe.machines['Assembler'].extras['energyDraw'] * boost; // boost was 100 in v < 0.2.6
            let energyDraw = baseEnergyDraw * q * tickFactor;

            if (u.energy < energyDraw) {
                // there's not enough for us to work! But, we'll take what there is.
                // console.log("Assembly Plant: not enough energy to work!");
                energyDraw = u.energy;
            }

            // NB if efficiency goes above 10, we start taking heat from
            // the universe to work! Not sure if I'll use this.
            u.energy -= energyDraw;
            let work = eff * energyDraw * 0.1;
            u.heat += (energyDraw - work);

            // Artificial increase to efficiency from idle philosophers
            // NB doesn't affect energy draw
            work *= this.idlePhilosopherBoost();

            this.constructionService.addWork(work);
            this.meteringService.addQuantity('construction-energy-cost', energyDraw);
            this.meteringService.addQuantity('work', work);
        }
    }

    public idlePhilosopherBoost(): number {
        let boost = 1;
        if (this.isResearched(new IntelligentAssembly()) && !this.researchService.isResearching()) {
            const numPhils = this.machineQuantity("PhotonicPhilosopher");
            const philEff = this.universeService.universe.machines["PhotonicPhilosopher"].efficiency;
            boost = 1 + (numPhils * philEff * 0.2);
        }

        return boost;
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
