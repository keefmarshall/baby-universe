import { Globals } from '../globals';
import { Universe } from '../services/universe';
import { UniverseService } from '../services/universe.service';
import { ResearchProject } from 'app/research/research-project';
import { NumberFormatter } from 'app/util/number-formatter';


export abstract class Machine {
    //readonly name: string;

    public readonly needsConstruction: boolean = false;
    public readonly numberFormatter = new NumberFormatter();

    public canSee: boolean = false;
    public canBuy: boolean = false;
    public canBuy10: boolean = false;
    public canBuy20: boolean = false;
    public canBuy50: boolean = false;

    abstract onTick(factor: number);
    abstract preconditions(): boolean;
    abstract displayCost(count: number): string;
    abstract payFor(count: number): boolean;
    abstract affordable(amount: number): boolean;

    constructor(
        public readonly name: string,
        public readonly displayName: string,
        public readonly displayPurpose: string,
        protected universeService: UniverseService,
        public canBuyMultiple = false
    ) { }

    defaultProperties(): MachineProperties {
        return new MachineProperties();
    }

    properties(): MachineProperties {
        return this.universeService.universe.machines[this.name] ||
                 this.defaultProperties();
    }

    /** This seems to come up quite frequently */
    protected machineQuantity(machineName: string): number {
        if (this.universeService.universe.machines[machineName] == null) {
            return 0;
        } else {
            return this.universeService.universe.machines[machineName].quantity;
        }
    }

    protected isResearched(project: ResearchProject): boolean {
        const props = this.universeService.universe.research[project.name];
        return props != null ? props.researched : false;
    }
}

export class MachineProperties {
    quantity = 0;
    efficiency = Globals.secondsPerTick;
    extras = {};
}
 