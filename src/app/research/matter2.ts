import { ResearchProject } from "./research-project";
import { Universe } from "../services/universe";
import { ALL_PARTICLES } from "../physics/particle";
import { ParticleUtils } from "../physics/particle-utils";
import { WZBosons } from "./radioactivity";

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
        super("Matter: Pions", "A small Meson", 20, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Mesons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('π⁺', universe);
        this.log("Pions: π⁺ made from an up quark and an anti-down quark (ud̅);\n" +
                "π⁻ made from an anti-up quark and a down quark (u̅d).")
    }
}

export class Kaons extends ResearchProject {

    constructor() {
        super("Matter: Kaons", "A larger Meson", 30, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Pions());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('K⁺', universe);
        this.log("Kaons: K⁺ made from an up quark and an anti-strange quark (us̅);\n" +
                "K⁻ made from an anti-up quark and a strange quark (u̅s).");
    }
}

export class NeutralMesons extends ResearchProject {

    constructor() {
        super("Matter: Neutral Mesons", "Additional quark/antiquark pairs", 7500, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new WZBosons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('π⁰', universe);
        ParticleUtils.initialiseParticles('K⁰', universe);
        this.log("Neutral Mesons: mysterious neutrally charged particles made from quark/antiquark pairs. " +
            "π⁰ is either uu̅ or dd̅; K⁰ is either ds̅ or d̅s. You can never know which.");
    }
}

export class Leptons extends ResearchProject {

    constructor() {
        super("Matter: Leptons", "A new class of Fermion, fundamental particles.", 1000, 2, 10);
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
        super("Matter: Baryons", "Hadrons made by combining quarks or antiquarks", 50, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return universe.matter['K⁺'] && universe.matter['K⁺'] >= 50;
    }

    onCompletion(universe: Universe) {
        this.log("Baryons are made from three quarks or antiquarks. You need to find the right combinations.");
    }
}

export class Protons extends ResearchProject {

    constructor() {
        super("Matter: Protons", "A common baryon", 100, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Baryons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('p', universe);
        this.log("Protons: two up quarks and one down quark (uud) or antiquarks (u̅u̅d̅).");
    }
}

export class Neutrons extends ResearchProject {

    constructor() {
        super("Matter: Neutrons", "A common baryon", 175, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Baryons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('n', universe);
        this.log("Neutrons: one up quark and two down quarks (udd) or antiquarks (u̅d̅d̅).");
    }
}

export class Electrons extends ResearchProject {

    constructor() {
        super("Matter: Electrons", "A common lepton", 1500, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Leptons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('e⁻', universe);
        this.log("Electrons (e⁻): tiny, negatively charged leptons. " +
            "Their anti-matter equivalents are called Positrons (e⁺), and have a positive charge.");
    }
}

export class Muons extends ResearchProject {

    constructor() {
        super("Matter: Muons", "A slightly larger lepton", 3500, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Electrons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('μ⁻', universe);
        this.log("Muons (μ⁻): small, negatively charged leptons. A little bigger than an electron.");
    }
}

export class Tauons extends ResearchProject {

    constructor() {
        super("Matter: Tau Leptons", "The largest lepton", 5000, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Electrons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('τ⁻', universe);
        this.log("Tau Leptons (τ⁻): negatively charged leptons. The heaviest of all the leptons.");
    }
}

export class Neutrinos extends ResearchProject {

    constructor() {
        super("Matter: Neutrinos", "A type of lepton", 2500, 2, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Leptons());
    }

    onCompletion(universe: Universe) {
        ParticleUtils.initialiseParticles('νe', universe);
        ParticleUtils.initialiseParticles('νμ', universe);
        ParticleUtils.initialiseParticles('ντ', universe);
        this.log("Neutrinos (ν<sub>e</sub>, ν<sub>μ</sub>, ν<sub>τ</sub>): tiny, neutral leptons, with almost no mass. " +
            "They come in different flavours but are hard to distinguish, " +
            " and barely interact with anything else.");
    }
}

