import { Machine, MachineProperties } from "app/machines/machine";
import { Globals } from "app/globals";
import { KineticConstruction } from "app/research/kinetics";
import { UniverseService } from "app/services/universe.service";
import { ConstructionService } from "app/services/construction.service";
import { MeteringService } from "app/services/metering.service";
import { ConstructionEnergyCostMeter } from "app/meters/construction-energy-cost-meter";

export class Assembler extends Machine {
    protected baseEnergyCost = 3000;
    protected costMultiplier = 1.05;

    protected baseEnergyDraw = 1;

    constructor(universeService: UniverseService,
        private constructionService: ConstructionService,
        private meteringService: MeteringService,
        _name = 'Assembler',
        _displayName = 'Assembler',
        _description = "Converts stored energy to useful work"
    ) {
        super(_name, _displayName, _description, universeService);
    }

    // ////////////////////////////////
    // Abstract method implementations

    onTick() {
        // We only take energy and produce work while something is being built
        // which makes this a bit complex
        if (this.constructionService.isConstructing()) {
            // We take 1 energy per tick and lossily convert it to work.
            // The lost energy is converted to universal heat.
            const u = this.universeService.universe;
            const q = this.properties().quantity;
            const energyDraw = this.properties().extras['energyDraw']  * q;
            if (u.energy < energyDraw) {
                // do nothing, there's not enough for us to work!
                console.log("Assembler: not enough energy to work!");
            } else {
                // NB if efficiency goes above 10, we start taking heat from
                // the universe to work! Not sure if I'll use this.
                u.energy -= energyDraw;
                const work = this.properties().efficiency * energyDraw * 0.1;
                u.heat += (energyDraw - work);
                this.constructionService.addWork(work);
                this.meteringService.addQuantity('construction-energy-cost', energyDraw);
                this.meteringService.addQuantity('work', work);
            }
        }
    }

    preconditions(): boolean {
        const kcres = 
            this.universeService.universe.research[new KineticConstruction().name];
        return kcres != null ? kcres.researched : false;
    }

    displayCost(count: number = 1): string {
        return parseFloat(this.energyCost(count).toPrecision(3)) + ' MeV';
    }

    payFor(amount: number = 1): boolean {
        const cost = this.energyCost(amount);
        if (this.affordable(amount)) {
            this.universeService.universe.energy -= cost;

            const q = this.properties().quantity || 0;
            if (q === 0) {
                this.universeService.universe.logs.push(
                    "Assemblers use up energy while building. Inefficiency produces heat as waste.");
            }
            return true;
        } else {
            return false;
        }
    }

    affordable(amount: number = 1): boolean {
        return this.universeService.universe.energy >= this.energyCost(amount);
    }

    // override
    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.extras['energyDraw'] = this.baseEnergyDraw;
        return props;
    }

    // ////////////////////////////////
    // Internal functions

    energyCost(amount: number = 1): number {
        const q = (this.properties().quantity || 0) +
            (this.machineQuantity('AssemblyPlant') * 10);

        const cost = this.baseEnergyCost *
            Globals.geometricProgressionSum(q, q + amount - 1, this.costMultiplier);

        return cost;
    }


}
