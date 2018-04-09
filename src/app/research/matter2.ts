import { ResearchProject } from "./research-project";
import { Universe } from "../services/universe";

/**
 * Phase TWO Matter research
 */
export class Hadrons extends ResearchProject {

    constructor() {
        super("Matter: Hadrons", "Particles made from combining quarks and gluons", 5, 2, 10);
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
        super("Matter: Mesons", "Hadrons made from a quark and an anti-quark", 10, 2, 10);
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
        super("Matter: Pions π+/π-", "A small Meson", 20, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Mesons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('pion', universe);
        this.log("Pions: π+ made from an up quark and an anti-down quark (ud̅);\n" +
                "π- made from an anti-up quark and a down quark (u̅d).")
    }
}

export class Kaons extends ResearchProject {

    constructor() {
        super("Matter: Kaons K+/K-", "A larger Meson", 50, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Pions());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('kaon', universe);
        this.log("Kaons: K+ made from an up quark and an anti-strange quark (us̅);\n" +
                "K- made from an anti-up quark and a strange quark (u̅s).");
    }
}

export class Leptons extends ResearchProject {

    constructor() {
        super("Matter: Leptons", "A new class of Fermion, fundamental particles.", 200, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Baryons());
    }

    onCompletion(universe: Universe) {
        this.log("You have identified a completely new type of fundamental particle. More research required.");
    }
}

export class Baryons extends ResearchProject {

    constructor() {
        super("Matter: Baryons", "Hadrons made by combining quarks or antiquarks", 100, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return universe.particles['kaon'] && universe.particles['kaon'] >= 50;
    }

    onCompletion(universe: Universe) {
        this.log("Baryons are made from three quarks or antiquarks. You need to find the right combinations.");
    }
}

export class Protons extends ResearchProject {

    constructor() {
        super("Matter: Protons", "A common baryon", 350, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Baryons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('proton', universe);
        this.log("Protons: two up quarks and one down quark (uud) or antiquarks (u̅u̅d̅).");
    }
}

export class Neutrons extends ResearchProject {

    constructor() {
        super("Matter: Neutrons", "A common baryon", 500, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Baryons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('neutron', universe);
        this.log("Neutrons: one up quark and two down quarks (udd) or antiquarks (u̅d̅d̅).");
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
