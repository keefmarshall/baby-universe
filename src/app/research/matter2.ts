import { ResearchProject } from "./research-project";
import { Universe } from "../services/universe";

/**
 * Phase TWO Matter research
 */
export class Hadrons extends ResearchProject {

    constructor() {
        super("Matter: Hadrons", "Particles made from combining quarks and gluons", 10, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, 'RudimentaryResearcher') > 0;
    }

    onCompletion(universe: Universe) {
        this.log("Hadrons! Now all those quarks can be used for something.")
    }
}

export class Mesons extends ResearchProject {

    constructor() {
        super("Matter: Mesons", "Hadrons made from a quark and an anti-quark", 15, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Hadrons());
    }

    onCompletion(universe: Universe) {
        this.log("There are many types of Meson, more research is required.")
    }
}

export class Pions extends ResearchProject {

    constructor() {
        super("Matter: Pions π+/π-", "A small Meson", 30, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Mesons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('pion', universe);
        this.log("Pions: π+ made from an up quark and an anti-down quark;\n" +
                "π- made from an anti-up quark and a down quark.")
    }
}

export class Kaons extends ResearchProject {

    constructor() {
        super("Matter: Kaons K+/K-", "A larger Meson", 75, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Pions());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('kaon', universe);
        this.log("Kaons: K+ made from an up quark and an anti-strange quark;\n" +
                "K- made from an anti-up quark and a strange quark.")
    }
}

export class Leptons extends ResearchProject {

    constructor() {
        super("Matter: Leptons", "A new class of Fermion, fundamental particles.", 20, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Hadrons());
    }

    onCompletion(universe: Universe) {
        this.log("You have identified a completely new type of fundamental particle. More research required.")
    }
}

class ParticleUtils {
    static initialiseParticles(type: string, u: Universe) {
        if (!u.particles[type]) {
            u.particles[type] = 0;
            u.antiparticles[type] = 0;
        }
    }
}