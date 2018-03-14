import { Machine } from "app/machines/machine";
import { UniverseService } from "app/services/universe.service";
import { MachineService } from "app/services/machine.service";
import { Globals } from "app/globals";
import { LogService } from "../services/log.service";

export abstract class ConstructionProject extends Machine {
    public readonly needsConstruction: boolean = true;
    protected machineService: MachineService = null;

    private workGained: number = 0;

    constructor(
        public readonly name: string,
        public readonly displayName: string,
        public readonly displayPurpose: string,
        protected universeService: UniverseService,
        protected logService: LogService,
        protected readonly baseCost: number = 1,
        protected readonly costMultiplier: number = 1
    ) {
        super(name, displayName, displayPurpose, universeService, logService);
    }

    // We can't inject this, due to circular dependency problems.
    // Instead, we need to set it when the project is first started.
    public setMachineService(machineService: MachineService) {
        this.machineService = machineService;
    }

    /** returns 'true' if construction complete */
    addWork(work: number): boolean {
        this.workGained += work;
        if (this.workGained >= this.workCost()) {
            this.onComplete();
            this.workGained = 0;
            return true;
        } else {
            return false;
        }
    }

    reset() {
        this.workGained = 0;
    }

    affordable() {
        return (this.universeService.universe.currentConstructionProject === null);
    }

    progress(): number {
        return this.workGained * 100 / this.workCost();
    }

    currentWorkTotal(): number {
        return this.workGained;
    }

    workCost(): number {
        const q = this.properties().quantity;
        return Globals.geometricProgressionSum(q, q, this.costMultiplier) * this.baseCost;
    }

    displayCost(count: number): string {
        // return Math.floor(this.workCost()) + " Work";
        return this.numberFormatter.numberWithCommas(Math.floor(this.workCost())) + " Work";
    }

    payFor(count: number): boolean {
        return this.affordable();
    }

    abstract onComplete();
}
