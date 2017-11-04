import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonCollector } from "app/machines/photon-collector";

export class Photovoltaics extends ResearchProject {

    constructor() {
        super("Photovoltaics", "Doubles efficiency of Photon Collectors", 1);
    }

    preconditions(universe: Universe): boolean {
        return true;
    }

    onCompletion(universe: Universe) {
        // in theory we can't get here without at least some photon collectors
        console.log("PV: onCOmpletion: universe = " + universe);
        universe.machines[PhotonCollector.name].efficiency *= 2;
    }
}
