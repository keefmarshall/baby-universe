import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { KineticConstruction } from "app/research/kinetics";
import { Assembler } from "app/machines/assembler";

export class Heat extends ResearchProject {
    constructor() {
        super("Heat", "Why are assemblers so inefficient?", 150);
    }

    preconditions(universe: Universe): boolean {
        const kcResearched = this.isResearched(universe, new KineticConstruction());
        const assemblersBuilt = this.machineQuantity(universe, "Assembler");

        return kcResearched && assemblersBuilt > 1;
    }

    onCompletion(universe: Universe) {
        // makes other stuff available
    }
}

export class HeatEngines extends ResearchProject {
    constructor() {
        super("Heat Engines", "Double the energy draw of assemblers and heaters", 1500);
    }

    preconditions(universe: Universe): boolean {
        const kcResearched = this.isResearched(universe, new Heat());

        return kcResearched;
    }

    onCompletion(universe: Universe) {
        universe.machines['Assembler'].extras['energyDraw'] *= 2
        universe.machines['SpaceHeater'].extras['energyDraw'] *= 2
    }
}

export class HeatPumps extends ResearchProject {
    constructor() {
        super("Heat Pumps", "Double the energy draw of assemblers and heaters", 5000);
    }

    preconditions(universe: Universe): boolean {
        const kcResearched = this.isResearched(universe, new HeatEngines());
        const keResearched = this.isResearched(universe, new KineticEngineering());
        return kcResearched && keResearched;
    }

    onCompletion(universe: Universe) {
        universe.machines['Assembler'].extras['energyDraw'] *= 2
        universe.machines['SpaceHeater'].extras['energyDraw'] *= 2
    }
}


export class KineticEnergyRecovery extends ResearchProject {
    constructor() {
        super("Kinetic Energy Recovery", "Recover work energy lost as heat", 750);
    }

    preconditions(universe: Universe): boolean {
        const heatResearched = this.isResearched(universe, new Heat());
        const assemblersBuilt = this.machineQuantity(universe, "Assembler");

        return heatResearched && assemblersBuilt > 4;
    }

    onCompletion(universe: Universe) {
        // treble efficiency of assemblers:
        universe.machines['Assembler'].efficiency *= 3;
    }
}

export class KineticEngineering extends ResearchProject {

    constructor() {
        super("Kinetic Engineering", "Advanced construction skills", 3500);
    }

    preconditions(universe: Universe): boolean {
        const kersResearched = this.isResearched(universe, new KineticEnergyRecovery());
        const assemblersBuilt = this.machineQuantity(universe, "Assembler");

        return kersResearched && assemblersBuilt >= 10;
    }

    onCompletion(universe: Universe) {
        // treble efficiency of assemblers:
        universe.machines['Assembler'].efficiency *= (10 / 3);
    }
}
