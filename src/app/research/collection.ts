import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";

export class QuantumElectrodynamics extends ResearchProject {

    constructor() {
        super("Quantum Electrodynamics", "How photons interact with matter", 5000);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, "QuarkScoop") >= 10;
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
