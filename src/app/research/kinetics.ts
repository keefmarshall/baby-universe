import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";

export class KineticConstruction extends ResearchProject {
    protected readonly scienceRequired = 1;
    public readonly name = "Kinetic Construction";
    public readonly description =
        "How to convert energy into useful work";

    preconditions(universe: Universe): boolean {
        return universe.machines['PhotonicPhilosopher'] != null
            && universe.machines['PhotonicPhilosopher'].quantity > 0;
    }

    onCompletion(universe: Universe) {
        // do nothing
    }
}

export class KineticEngineering extends ResearchProject {
    protected readonly scienceRequired = 100;
    public readonly name = "Kinetic Engineering";
    public readonly description =
        "Advanced construction skills";

    preconditions(universe: Universe): boolean {
        const kcname = new KineticConstruction().name;
        const kcprops = universe.research[kcname];
        return kcprops != null ? kcprops.researched : false;
    }

    onCompletion(universe: Universe) {
        // do nothing
    }
}
