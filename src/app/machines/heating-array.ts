import { UniverseService } from "app/services/universe.service";
import { MeteringService } from "app/services/metering.service";
import { ConstructionProject } from "app/machines/construction-project";
import { KineticEngineering, HeatPumps } from "app/research/kinetics2";
import { HeatingService } from "app/services/heating.service";

export class HeatingArray extends ConstructionProject {
    // protected baseEnergyDraw = 100;
    private heaterCost = 10; // 10 Heaters make an Array

    constructor(universeService: UniverseService,
        private heatingService: HeatingService,
        private meteringService: MeteringService
    ) {
        super('HeatingArray',
            "Heating Array",
            "Combines space heaters to draw 10x energy",
            universeService, 2500, 1.2);
    }

    // cut-and-paste from Assembler, can't find easy way to share the code
    // - we can't just extend Assembler as this has to be a construction project
    // - could factor out into a Utils class but there's a ton of dependencies
    onTick() {
        // We only take energy while heating
        // which makes this a bit complex
        if (this.heatingService.isHeating()) {
            // We take 1 energy per tick and convert to universal heat.
            const u = this.universeService.universe;
            const q = this.properties().quantity;
            const baseEnergyDraw = this.universeService.universe.machines['SpaceHeater'].extras['energyDraw'] * 100;
            const resq = this.machineQuantity('ThermalResistor');
            const energyDraw = baseEnergyDraw * q * Math.pow(10, resq);
            if (u.energy < energyDraw) {
                // do nothing, there's not enough for us to work!
                console.log("Heating Array: not enough energy to work!");
            } else {
                u.energy -= energyDraw;
                u.heat += energyDraw;
                this.meteringService.addQuantity('heater-energy-cost', energyDraw);
            }
        }
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    preconditions(): boolean {
        return this.isResearched(new HeatPumps()) &&
            this.machineQuantity('Paser') > 0;
    }

    displayCost(count: number = 1): string {
        return super.displayCost(count) + ", " + this.heaterCost + " Space Heaters";
    }

    affordable(): boolean {
        return super.affordable() &&
            this.machineQuantity('SpaceHeater') > this.heaterCost;
    }

    payFor(count: number): boolean {
        if (this.affordable()) {
            // assume no race conditions, otherwise we'll have a ton of
            // nested ifs and we'll need to rollback on error
            const u = this.universeService.universe;
            u.machines['SpaceHeater'].quantity -= this.heaterCost;
            super.payFor(count);
            return true;
        } else {
            return false;
        }
    }

}