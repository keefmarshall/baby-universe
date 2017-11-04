import { Universe } from "app/services/universe";

export abstract class ResearchProject {
    

    public canBuy: boolean = false;
    public canSee: boolean = false;

    private scienceGained = 0;
    private researched = false;

    abstract preconditions(universe: Universe): boolean;
    abstract onCompletion(universe: Universe);

    constructor(
        public readonly name: string,
        public readonly description: string,
        protected readonly scienceRequired: number = 1
    ) {}

    addScience(quantity: number, universe: Universe) {
        this.scienceGained += quantity;
        if (this.scienceGained > this.scienceRequired) {
            this.researched = true;
            this.onCompletion(universe);
        }
    }

    currentScience(): number {
        return this.scienceGained;
    }

    progress(): number {
        return this.scienceGained * 100 / this.scienceRequired;
    }

    isComplete(): boolean {
        return this.researched;
    }

    displayCost() {
        return this.scienceRequired + " science";
    }

    reset() {
        this.scienceGained = 0;
        this.researched = false;
    }

    /** This seems to come up quite frequently */
    protected machineQuantity(universe: Universe, machineName: string): number {
        if (universe.machines[machineName] == null) {
            return 0;
        } else {
            return universe.machines[machineName].quantity;
        }
    }
}
