import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { LightMechanics } from "app/research/light-mechanics";

export class LightEngineering extends ResearchProject {
    protected readonly scienceRequired = 10;
    public readonly name = "Light Engineering";
    public readonly description =
        "Allows light assemblers to construct complex machines";

    preconditions(universe: Universe): boolean {
        const lightMechName = new LightMechanics().name;
        const lightMechProps = universe.research[lightMechName];
        return lightMechProps != null ? lightMechProps.researched : false;
    }

    onCompletion() {
        // do nothing
    }
}
