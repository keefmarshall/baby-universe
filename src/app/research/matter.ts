import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonCollector } from "app/machines/photon-collector";

export class Leptons extends ResearchProject {

    constructor() {
        super("Matter: Leptons", "Simple building blocks of Matter", 10);
    }

    preconditions(universe: Universe): boolean {
        const pcprops = universe.machines[PhotonCollector.name];
        return pcprops != null ? pcprops.quantity >= 50 : false;
    }

    onCompletion(universe: Universe) {
    }

}
