import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonCollector } from "app/machines/photon-collector";

export class Leptons extends ResearchProject {

    constructor() {
        super("Matter: Leptons", "Simple building blocks of Matter", 10);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, PhotonCollector.name) >= 50;
    }

    onCompletion(universe: Universe) {
    }

}
