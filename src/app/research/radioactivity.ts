import { ResearchProject } from "./research-project";
import { Universe } from "../services/universe";


export class WeakInteraction extends ResearchProject {

    constructor() {
        super("Weak Interaction", "A new way for particles to interact", 1250, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        // 246 GeV apparently - 2.8 x 10^15K
        // but the elctroweak epoch technically ends around 10^22 K
        // so let's use some licence here.
        return universe.heat < 8e15;
    }

    onCompletion(universe: Universe) {
        this.log("The weak interaction is a new way for particles to interact with each other.");
    }
}

export class WZBosons extends ResearchProject {

    constructor() {
        super("Matter: W & Z Bosons", "Mysterious new fundamental particles", 2000, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new WeakInteraction());
    }

    onCompletion(universe: Universe) {
        this.log("W⁺, W⁻ and Z bosons. Your researchers have no idea what they do...");
    }
}

export class RadioactiveDecay extends ResearchProject {

    constructor() {
        super("Radioactive Decay", "Perhaps your particles are not as stable as you thought?", 3000, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new WZBosons());
    }

    onCompletion(universe: Universe) {
        this.log(
            "Particles and Hadrons can decay into other forms, over time. " +
            "Maybe those weird W & Z boson things have something to do with this.");
    }
}
