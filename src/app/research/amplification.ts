import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { Photoelectrics } from "app/research/photons";
import { KineticEngineering } from "app/research/kinetics2";

const SQRT25 = Math.sqrt(2.5);

export class PhotonAmplification extends ResearchProject {

    constructor() {
        super("Photon Amplification", "The science of turning one photon into many", 4000);
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
        this.log("Build Pasers to amplify the energy collected from each photon");
    }
}

export class QSwitching extends ResearchProject {

    constructor() {
        super("Q-Switching", "Optimised photon amplification technique", 15000);
    }

    preconditions(universe: Universe): boolean {
        const paResearched = this.isResearched(universe, new PhotonAmplification());
        const npasers = this.machineQuantity(universe, "Paser");

        return paResearched && npasers > 4;
    }

    onCompletion(universe: Universe) {
        const qsBoost = SQRT25;
        const npasers = this.machineQuantity(universe, "Paser") 

        // We have to enhance Paser efficiency, but also 'catch up' for any existing Pasers
        universe.machines['Paser'].efficiency *= qsBoost;
        universe.machines['PhotonCollector'].efficiency *= Math.pow(qsBoost, npasers);

        this.log("Now our Pasers are a lot more effective");
    }
}

export class ModeLocking extends ResearchProject {

    constructor() {
        super("Mode-Locking", "Exceptional photon amplification technique", 40000);
    }

    preconditions(universe: Universe): boolean {
        const paResearched = this.isResearched(universe, new QSwitching());
        const npasers = this.machineQuantity(universe, "Paser");

        return paResearched && npasers > 8;
    }

    onCompletion(universe: Universe) {
        const qsBoost = SQRT25;
        const npasers = this.machineQuantity(universe, "Paser") 

        // We have to enhance Paser efficiency, but also 'catch up' for any existing Pasers
        universe.machines['Paser'].efficiency *= qsBoost;
        universe.machines['PhotonCollector'].efficiency *= Math.pow(qsBoost, npasers);

        this.log("Pasers cumulatively enhanced.");
    }
}
