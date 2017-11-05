import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { Assembler } from "app/machines/assembler";
import { Photovoltaics } from "app/research/photons";

export class KineticConstruction extends ResearchProject {

    constructor() {
        super("Kinetic Construction", "How to convert energy into useful work", 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Photovoltaics());
    }

    onCompletion(universe: Universe) {
        // do nothing
    }
}

export class KineticEngineering extends ResearchProject {

    constructor() {
        super("Kinetic Engineering", "Advanced construction skills", 5000)
    }

    preconditions(universe: Universe): boolean {
        const kcResearched = this.isResearched(universe, new KineticConstruction());
        const assemblersBuilt = this.machineQuantity(universe, "Assembler");

        return kcResearched && assemblersBuilt > 4;
    }

    onCompletion(universe: Universe) {
        // do nothing
    }
}
