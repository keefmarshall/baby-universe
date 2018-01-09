import { Machine, MachineProperties } from "app/machines/machine";
import { UniverseService } from "app/services/universe.service";
import { HeatingService } from "app/services/heating.service";
import { Heat } from "app/research/kinetics2";
import { Globals } from "app/globals";
import { MeteringService } from "app/services/metering.service";

/**
 * This is essentially an Assembler that does no useful work.
 */
export class SpaceHeater extends Machine {
    // These match Assembler:
    protected baseEnergyCost = 3000;
    protected costMultiplier = 1.05;

    protected baseEnergyDraw = 1;

    constructor(universeService: UniverseService,
        private heatingService: HeatingService,
        private meteringService: MeteringService,
        _name = 'SpaceHeater',
        _displayName = 'Space Heater',
        _description = "Converts stored energy to heat"
    ) {
        super(_name, _displayName, _description, universeService);
    }

    onTick() {
        // We only take energy and produce heat while the heating is on
        if (this.heatingService.isHeating()) {
            // We take 1 energy per tick and convert to universal heat.
            const u = this.universeService.universe;
            const q = this.properties().quantity;
            const energyDraw = this.properties().extras['energyDraw'] * q;
            if (u.energy < energyDraw) {
                // do nothing, there's not enough for us to work!
                console.log("Space Heater: not enough energy to work!");
            } else {
                u.energy -= energyDraw;
                u.heat += energyDraw;
                this.meteringService.addQuantity('heater-energy-cost', energyDraw);
            }
        }
    }
    preconditions(): boolean {
        return this.machineQuantity("Thermometer") > 0;
    }

    displayCost(count: number): string {
        return parseFloat(this.energyCost(count).toPrecision(3)) + ' MeV';
    }

    payFor(amount: number): boolean {
        const cost = this.energyCost(amount);
        if (this.affordable(amount)) {
            this.universeService.universe.energy -= cost;

            const q = this.properties().quantity || 0;
            if (q === 0) {
                this.universeService.universe.logs.push("Toasty!");
            }
            return true;
        } else {
            return false;
        }
    }

    affordable(amount: number): boolean {
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
        const q = (this.properties().quantity || 0);

        const cost = this.baseEnergyCost *
            Globals.geometricProgressionSum(q, q + amount - 1, this.costMultiplier);

        return cost;
    }

}
