import { Globals } from '../globals';
import { Universe } from '../services/universe';
import { UniverseService } from '../services/universe.service';


export abstract class Machine {
    //readonly name: string;

    public canSee: boolean = false;
    public canBuy: boolean = false;

    abstract onTick();
    abstract preconditions(): boolean;
    abstract displayCost(count: number): string;
    abstract payFor(count: number): boolean;
    abstract affordable(amount: number): boolean;

    constructor(
        public readonly name: string,
        protected universeService: UniverseService
    ) { }

    defaultProperties(): MachineProperties {
        return new MachineProperties();
    }

    properties(): MachineProperties {
        return this.universeService.universe.machines[this.name] ||
                 this.defaultProperties();
    }
}

export class MachineProperties {
    quantity = 0;
    efficiency = Globals.secondsPerTick;
    extras = {};
}
 