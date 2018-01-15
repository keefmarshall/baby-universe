import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { Globals } from "app/globals";

export class QuantumElectrodynamics extends ResearchProject {

    constructor() {
        super("Quantum Electrodynamics", "How photons interact with matter", 5000);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, "QuarkScoop") >= 5;
    }

    onCompletion(universe: Universe) {
        // treble efficiency of scoops:
        universe.machines['QuarkScoop'].efficiency *= 10;
        universe.logs.push("Now we can make our scoops work more efficiently.");
    }

}

export class QuantumChromodynamics extends ResearchProject {

    constructor() {
        super("Quantum Chromodynamics", "Why are some quarks red, and some blue?", 10000);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new QuantumElectrodynamics());
    }

    onCompletion(universe: Universe) {
        // allows stuff to be built
        universe.logs.push("Gluons? where did they come from?!")
    }

}

export class ColourDeconfinement extends ResearchProject {

    constructor() {
        super("Colour Deconfinement", "Increase efficiency of the Quark Squeezer", 20000);
    }

    preconditions(universe: Universe): boolean {
        // Going to cheat - the actual required temperature for colour deconfinement
        // is around 170MeV which we reach very quickly.
        // const requiredTemp = 2e12; // deconfinement temp in Kelvin
        // const requiredHeat = Globals.boltzmann * requiredTemp; // MeV
        const requiredHeat = 2e12; // Invented MeV value. Developer's licence.

        return this.machineQuantity(universe, 'QuarkSqueezer') > 0 &&
            this.machineQuantity(universe, 'Thermometer') > 0 &&
            universe.heat > requiredHeat;
    }

    onCompletion(universe: Universe) {
        universe.machines['QuarkSqueezer'].efficiency *= 5;
        universe.logs.push("What we have here is a Quark-Gluon plasma. Heat it up (a lot) to see what happens next!");
    }

}