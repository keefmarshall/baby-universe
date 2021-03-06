import { Machine } from "app/machines/machine";
import { UniverseService } from "app/services/universe.service";
import { ConstructionService } from "app/services/construction.service";
import { Globals } from "app/globals";
import { LogService } from "../services/log.service";

export class ThermalSpanner extends Machine {
    private baseEnergyCost = 6500;
    private costMultiplier = 1.02;

    constructor(universeService: UniverseService,
        logService: LogService,
        private constructionService: ConstructionService) {

        super('ThermalSpanner',
            "Thermal Spanner",
            "Sabotage assembler construction. Use with care.",
            universeService,
            logService);
    }

    onTick(tickFactor: number) {
        // do nothing
    }

    preconditions(): boolean {
        return (this.machineQuantity("Assembler") > 0
                || this.machineQuantity("AssemblyPlant") > 0)
                && this.properties().quantity < 1;
    }

    displayCost(count: number = 1): string {
        // return this.energyCost(count) + " MeV";
        return this.numberFormatter.abbreviateNumber(this.energyCost(count) * 1e6) + 'eV';
    }

    payFor(count: number = 1): boolean {
        if (this.affordable(count)) {
            this.universeService.universe.energy -= this.energyCost(count);
            // Now triggered by button in construction panel:
            // this.universeService.universe.logs.push(
            //     "A spanner in the works... Some damage may result.");
            // setTimeout(() => this.sabotage(), 30000);
            // this.constructionService.sabotage();

            return true;
        } else {
            return false;
        }
    }

    affordable(amount: number = 1): boolean {
        return (this.universeService.universe.energy >= this.energyCost(amount));
             // && this.constructionService.isConstructing();
    }

    // ////////////////////////////////
    // Internal functions

    energyCost(amount: number = 1): number {
        const q = this.machineQuantity('Assembler') - 1 +
            (this.machineQuantity('AssemblyPlant') * 25);

        const cost = this.baseEnergyCost *
            Globals.geometricProgressionSum(q, q + amount - 1, this.costMultiplier);

        return Math.round(cost);
    }

    trigger() {
        this.logService.addLog("A spanner in the works... Some damage may result.");
        setTimeout(() => this.sabotage(), 30000);
        this.constructionService.sabotage();
    }

    sabotage() {
        const qa = this.machineQuantity('Assembler');
        const qap = this.machineQuantity('AssemblyPlant');
        const u = this.universeService.universe;

        const achance = Math.floor(Math.random() * qa * 0.2);
        if (achance > 0) {
            // You've lost some Assemblers
            this.logService.addLog("Sabotage! It wasn't possible to repair all the Assemblers. Lost: " + achance);
            u.machines['Assembler'].quantity -= achance;
        }

        const apchance = Math.floor(Math.random() * qap * 0.1);
        if (apchance > 0) {
            // You've lost some Assembly Plants
            this.logService.addLog("Sabotage! Some Assembly Plants were broken up into Assemblers. Lost: " + apchance);
            u.machines['AssemblyPlant'].quantity -= apchance;
            u.machines['Assembler'].quantity += apchance * 10;
        }
    }
}
