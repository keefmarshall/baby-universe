import { Meter } from './meter';
import { Universe } from 'app/services/universe';

export class EnergyMeter implements Meter {
    public meterValue: number;

    private startPoint: number = 0;

    constructor(universe: Universe) {
        this.startPoint = universe.energy;
    }

    everySecond(universe: Universe) {
        this.meterValue = universe.energy - this.startPoint;
        this.startPoint = universe.energy;
    }

    addQuantity(n: number) { 
        // do nothing
    }
}
