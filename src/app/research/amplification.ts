import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { Photoelectrics } from "app/research/photons";
import { KineticEngineering } from "app/research/kinetics2";

export class PhotonAmplification extends ResearchProject {

    constructor() {
        super("Photon Amplification", "The science of turning one photon into many", 7500);
    }

    preconditions(universe: Universe): boolean {
        const peResearched = this.isResearched(universe, new Photoelectrics()) &&
                            this.isResearched(universe, new KineticEngineering());
        const quarksCaught = (universe.particles["top quark"] || 0) +
                                (universe.particles["bottom quark"] || 0);

        return peResearched && quarksCaught > 0;
    }

    onCompletion(universe: Universe) {
        // Does nothing, but enables Pasers to be constructed
        universe.logs.push("Build Pasers to greatly enhance the energy collected from each Photon");
    }
}
