import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonCollector } from "app/machines/photon-collector";

export class Leptons extends ResearchProject {
    protected readonly scienceRequired = 10;
    public readonly name = "Matter: Leptons";
    public readonly description =
        "Simple building blocks of Matter";

    preconditions(universe: Universe): boolean {
        const pcprops = universe.machines[PhotonCollector.name];
        return pcprops != null ? pcprops.quantity >= 50 : false;
    }

    onCompletion(universe: Universe) {
    }

}
