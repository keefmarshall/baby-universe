import { Meter } from "app/meters/meter";
import { Universe } from "app/services/universe";

export class WorkMeter implements Meter {
    private workGained = 0;

    meterValue: number;

    everySecond(universe: Universe) {
        this.meterValue = this.workGained;
        this.workGained = 0;
    }

    addQuantity(n: number) {
        this.workGained += n;
    }
}
