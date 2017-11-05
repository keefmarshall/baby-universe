import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { Assembler } from "app/machines/assembler";
import { Photovoltaics } from "app/research/photons";

export class KineticConstruction extends ResearchProject {

    constructor() {
        super("Kinetic Construction", "How to convert energy into useful work", 10);
    }

    preconditions(universe: Universe): boolean {
        const pvprops = universe.research[new Photovoltaics().name];
        return pvprops != null ? pvprops.researched : false;
    }

    onCompletion(universe: Universe) {
        // do nothing
    }
}

export class KineticEngineering extends ResearchProject {

    constructor() {
        super("Kinetic Engineering", "Advanced construction skills", 500)
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
