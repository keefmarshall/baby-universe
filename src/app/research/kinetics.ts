import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { Photovoltaics } from "app/research/photons";

export class KineticConstruction extends ResearchProject {

    constructor() {
        super("Kinetic Construction", "How to convert energy into useful work", 15);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Photovoltaics());
    }

    onCompletion(universe: Universe) {
        this.log(
            "Assemblers are now available. They turn stored energy into construction work when active.");
    }
}

