import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { KineticConstruction } from "app/research/kinetics";
import { Assembler } from "app/machines/assembler";

export class KineticEnergyRecovery extends ResearchProject {
    constructor() {
        super("Kinetic Energy Recovery", "Recover work energy lost as heat", 750);
    }

    preconditions(universe: Universe): boolean {
        const kcResearched = this.isResearched(universe, new KineticConstruction());
        const assemblersBuilt = this.machineQuantity(universe, "Assembler");

        return kcResearched && assemblersBuilt > 4;
    }

    onCompletion(universe: Universe) {
        // treble efficiency of assemblers:
        universe.machines['Assembler'].efficiency *= 3;
    }
}

export class KineticEngineering extends ResearchProject {

    constructor() {
        super("Kinetic Engineering", "Advanced construction skills", 5000);
    }

    preconditions(universe: Universe): boolean {
        const kersResearched = this.isResearched(universe, new KineticEnergyRecovery());
        const assemblersBuilt = this.machineQuantity(universe, "Assembler");

        return kersResearched && assemblersBuilt >= 20;
    }

    onCompletion(universe: Universe) {
        // treble efficiency of assemblers:
        universe.machines['Assembler'].efficiency *= (10 / 3);
    }
}
