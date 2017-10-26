import { Globals } from '../globals';
import { Universe } from '../services/universe';


export abstract class Machine {
    readonly name: string;

    abstract onTick(universe: Universe, props: MachineProperties);

    abstract preconditions(universe: Universe): boolean;

    constructor(name: string) {
        this.name = name;
    }

    defaultProperties(): MachineProperties {
        return new MachineProperties();
    }

}

export class MachineProperties {
    quantity = 1;
    efficiency = Globals.secondsPerTick;
    extras = {};
}
 