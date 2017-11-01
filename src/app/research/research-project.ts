import { Universe } from "app/services/universe";

export abstract class ResearchProject {
    readonly name: string;
    readonly description: string;

    public canBuy: boolean = false;
    public canSee: boolean = false;

    protected readonly scienceRequired: number = 1;
    private scienceGained = 0;
    private researched = false;

    abstract preconditions(universe: Universe): boolean;
    abstract onCompletion(universe: Universe);

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
}
