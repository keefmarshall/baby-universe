import { Universe } from "app/services/universe";
import { Meter } from "app/meters/meter";

export class HeaterEnergyCostMeter implements Meter {
    meterValue: number;

    private runningCost: number = 0;

    addQuantity(n: number) {
        this.runningCost += n;
    }

    everySecond(universe: Universe) {
        this.meterValue = this.runningCost;
        this.runningCost = 0;
    }
}
