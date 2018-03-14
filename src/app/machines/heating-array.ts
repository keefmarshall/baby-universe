import { UniverseService } from "app/services/universe.service";
import { MeteringService } from "app/services/metering.service";
import { ConstructionProject } from "app/machines/construction-project";
import { KineticEngineering, HeatPumps, AdvancedThermodynamics } from "app/research/kinetics2";
import { HeatingService } from "app/services/heating.service";
import { LogService } from "../services/log.service";

export class HeatingArray extends ConstructionProject {
    // protected baseEnergyDraw = 100;
    private heaterCost = 10; // 10 Heaters make an Array

    constructor(universeService: UniverseService,
        logService: LogService,
        private heatingService: HeatingService,
        private meteringService: MeteringService
    ) {
        super('HeatingArray',
            "Heating Array",
            "Combines space heaters to draw 10x energy",
            universeService, logService, 5000, 1.3);
    }

    // cut-and-paste from Assembler, can't find easy way to share the code
    // - we can't just extend Assembler as this has to be a construction project
    // - could factor out into a Utils class but there's a ton of dependencies
    onTick(tickFactor: number) {
        // We only take energy while heating
        // which makes this a bit complex
        if (this.heatingService.isHeating()) {
            // We take 1 energy per tick and convert to universal heat.
            const u = this.universeService.universe;
            const q = this.properties().quantity;
            const baseEnergyDraw = this.universeService.universe.machines['SpaceHeater'].extras['energyDraw'] * 100;
            const resq = this.machineQuantity('ThermalResistor');
            let energyDraw = baseEnergyDraw * q * Math.pow(10, resq) * tickFactor;
            if (u.energy < energyDraw) {
                // there's not enough for us to work! but we'll take what there is
                // console.log("Heating Array: not enough energy to work!");
                energyDraw = u.energy;
            }

            u.energy -= energyDraw;
            u.heat += energyDraw;
            this.meteringService.addQuantity('heater-energy-cost', energyDraw);
        }
    }

    onComplete() {
        this.machineService.addMachine(this);

        const met = this.properties().quantity > 19 &&
            this.isResearched(new AdvancedThermodynamics());
        if (met && !this.properties().extras['met']) {
            this.properties().extras['met'] = true;
            this.logService.addLog("Boost heating dramatically with Thermal Resistors.");
            setTimeout(() => {
                this.logService.addLog("Thermal Resistors need matter to contain all that heat energy.");
            }, 60000);
        }
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
