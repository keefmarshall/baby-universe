import { Universe } from '../services/universe';

export interface Meter {
    meterValue: number;
    everySecond(universe: Universe);
}
