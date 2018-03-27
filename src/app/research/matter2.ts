import { ResearchProject } from "./research-project";
import { Universe } from "../services/universe";

/**
 * Phase TWO Matter research
 */
export class Leptons extends ResearchProject {

    constructor() {
        super("Matter: Leptons", "Simple building blocks of Matter", 20, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, 'RudimentaryResearcher') > 0 &&
            this.isResearched(universe, new Hadrons());
    }

    onCompletion(universe: Universe) {
    }
}

export class Hadrons extends ResearchProject {

    constructor() {
        super("Matter: Hadrons", "Particles made from combining quarks and gluons", 10, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, 'RudimentaryResearcher') > 0;
    }

    onCompletion(universe: Universe) {
    }
}

