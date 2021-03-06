import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { KineticConstruction } from "app/research/kinetics";

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
        this.log("Maybe if we build some new machines, we can find out how to make Assembly more efficient?");
    }
}

export class HeatEngines extends ResearchProject {
    constructor() {
        super("Heat Engines", "Double the energy draw of assemblers and heaters", 1500);
    }

    preconditions(universe: Universe): boolean {
        const kcResearched = this.isResearched(universe, new Heat());
        const heatersBuilt = this.machineQuantity(universe, "SpaceHeater");

        return kcResearched && heatersBuilt > 0;
    }

    onCompletion(universe: Universe) {
        universe.machines['Assembler'].extras['energyDraw'] *= 2
        universe.machines['SpaceHeater'].extras['energyDraw'] *= 2
    }
}

export class HeatPumps extends ResearchProject {
    constructor() {
        super("Heat Pumps", "Treble the energy draw of assemblers and heaters", 5000);
    }

    preconditions(universe: Universe): boolean {
        const kcResearched = this.isResearched(universe, new HeatEngines());
        const keResearched = this.isResearched(universe, new KineticEngineering());
        return kcResearched && keResearched;
    }

    onCompletion(universe: Universe) {
        universe.machines['Assembler'].extras['energyDraw'] *= 3
        universe.machines['SpaceHeater'].extras['energyDraw'] *= 3
    }
}

export class AdvancedThermodynamics extends ResearchProject {
    constructor() {
        super("Advanced Thermodynamics", "Enhanced heating techniques", 20000);
    }

    preconditions(universe: Universe): boolean {
        const kcResearched = this.isResearched(universe, new HeatPumps());
        const narrays = this.machineQuantity(universe, "HeatingArray")
        return kcResearched && narrays > 4;
    }

    onCompletion(universe: Universe) {
        universe.machines['Assembler'].extras['energyDraw'] *= 4
        universe.machines['SpaceHeater'].extras['energyDraw'] *= 4
        // also enables advanced heating machinery
        this.log("With this advanced research, our Assemblers and Heaters can draw much more energy. ");

        // Encouragement message - see also HeatingArray
        const narrays = this.machineQuantity(universe, "HeatingArray")
        const met = narrays > 19
        if (met && !universe.machines['HeatingArray'].extras['met']) {
            universe.machines['HeatingArray'].extras['met'] = true;
            setTimeout(() => {
                this.log("Boost heating dramatically with Thermal Resistors.");
            }, 20000);
            setTimeout(() => {
                this.log("Thermal Resistors need matter to contain all that heat energy.");
            }, 60000);
        }

    }
}


export class KineticEnergyRecovery extends ResearchProject {
    constructor() {
        super("Kinetic Energy Recovery", "Recover work energy lost as heat", 300);
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
        super("Kinetic Engineering", "Advanced construction skills", 2750);
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

