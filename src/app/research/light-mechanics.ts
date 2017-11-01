import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";

export class LightMechanics extends ResearchProject {
    protected readonly scienceRequired = 1;
    public readonly name = "Light Mechanics";
    public readonly description =
        "Allows construction of light assemblers";

    preconditions(universe: Universe): boolean {
        return universe.machines['PhotonicPhilosopher'] != null
            && universe.machines['PhotonicPhilosopher'].quantity > 0;
    }

    onCompletion() {
        // do nothing
    }
}
