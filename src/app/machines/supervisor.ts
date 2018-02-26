import { Machine } from "app/machines/machine";
import { UniverseService } from "app/services/universe.service";
import { Globals } from "app/globals";
import { TickerService } from "app/services/ticker.service";
import { LogService } from "../services/log.service";

export class Supervisor extends Machine {
    private baseEnergyCost = 2500;
    private costMultiplier = 2;

    constructor(universeService: UniverseService,
        logService: LogService,
        private tickerService: TickerService) {
        super('Supervisor',
            "Supervisor",
            "Tends the machines in your absence",
            universeService, logService);
    }

    onTick(factor: number) {
        // do nothing
    }

    preconditions(): boolean {
        return this.machineQuantity("PhotonCollector") >= 20 && this.properties().quantity < 10;
    }

    displayCost(count: number): string {
        return this.numberFormatter.abbreviateNumber(this.energyCost(count) * 1e6) + 'eV';
    }

    payFor(count: number): boolean {
        const cost = this.energyCost(count);
        if (this.affordable(count)) {
            this.universeService.universe.energy -= cost;

            const q = this.properties().quantity || 0;
            if (q === 0) {
                this.logService.addLog(
                    "One Supervisor alone can only manage to keep the machines running at 10% capacity. You may want to deploy more.");
            } else if (q === 9) {
                this.logService.addLog(
                    "With ten supervisors your machines can now run happily at their full rate when you're not here.");
            }

            const eff = this.properties().efficiency;
            this.tickerService.supervisorEfficiency = (q + 1) * eff;
            this.tickerService.gameSupervised();

            return true;
        } else {
            return false;
        }
    }

    affordable(amount: number): boolean {
        return this.universeService.universe.energy >= this.energyCost(amount);
    }

    private energyCost(count: number): number {
        const q = (this.properties().quantity || 0);

        const cost = this.baseEnergyCost *
            Globals.geometricProgressionSum(q, q + count - 1, this.costMultiplier);

        return cost;
    }
}
