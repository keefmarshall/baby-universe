import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { Assembler } from "app/machines/assembler";

export class KineticConstruction extends ResearchProject {

    constructor() {
        super("Kinetic Construction", "How to convert energy into useful work", 5);
    }

    preconditions(universe: Universe): boolean {
        return universe.machines['PhotonicPhilosopher'] != null
            && universe.machines['PhotonicPhilosopher'].quantity > 0;
    }

    onCompletion(universe: Universe) {
        // do nothing
    }
}

export class KineticEngineering extends ResearchProject {

    constructor() {
        super("Kinetic Engineering", "Advanced construction skills", 100)
    }

    preconditions(universe: Universe): boolean {
        const kcprops = universe.research[new KineticConstruction().name];
        const kcResearched = kcprops != null ? kcprops.researched : false;

        const assemblers = universe.machines["Assembler"];
        const assemblersBuilt = (assemblers != null && assemblers.quantity > 4);

        return kcResearched && assemblersBuilt;
    }

    onCompletion(universe: Universe) {
        // do nothing
    }
}
