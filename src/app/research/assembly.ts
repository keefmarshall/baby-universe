import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";

export class InstructionPipelining extends ResearchProject {

    constructor() {
        super("Instruction Pipelining", "Technique for improving Assembly Plant efficiency", 12000);
    }

    preconditions(universe: Universe): boolean {
        const nplants = this.machineQuantity(universe, "AssemblyPlant");

        return nplants >= 5;
    }

    onCompletion(universe: Universe) {
        // double efficiency of assembly plants:
        universe.machines['AssemblyPlant'].efficiency *= Math.sqrt(10/3);
    }
}

export class SuperscalarPipelining extends ResearchProject {

    constructor() {
        super("Superscalar Pipelining", "Technique for improving Assembly Plant efficiency", 25000);
    }

    preconditions(universe: Universe): boolean {
        const ipResearched = this.isResearched(universe, new InstructionPipelining());
        const nplants = this.machineQuantity(universe, "AssemblyPlant");

        return ipResearched && nplants >= 12;
    }

    onCompletion(universe: Universe) {
        // take efficiency of assembly plants back to 10x Assemblers:
        universe.machines['AssemblyPlant'].efficiency *= Math.sqrt(10/3);
    }
}
