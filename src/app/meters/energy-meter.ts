import { Meter } from './meter';
import { Universe } from 'app/services/universe';

export class EnergyMeter implements Meter {
    public meterValue: number;
    public lastValue: number = 0;

    private startPoint: number = 0;

    constructor(universe: Universe) {
        this.startPoint = universe.energy;
    }

    everySecond(universe: Universe) {
        // this.lastValue = this.meterValue;
        // this.meterValue = (this.lastValue + universe.energy - this.startPoint) / 2;
        this.meterValue = universe.energy - this.startPoint;
        this.startPoint = universe.energy;
    }

    addQuantity(n: number) {
        // do nothing
    }
}
