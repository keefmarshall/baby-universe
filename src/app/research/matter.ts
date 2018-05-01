import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";
import * as Collections from 'typescript-collections';


export class Fermions extends ResearchProject {

    constructor() {
        super("Matter: Fermions", "The fundamental building blocks of Matter", 2, 0, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, "PhotonicPhilosopher") > 0;
    }

    onCompletion(universe: Universe) {
    }

}

export class Quarks1 extends ResearchProject {

    constructor() {
        super("Matter: Quarks I", "The most common flavours of quark", 3, 0, 10);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Fermions());
    }

    onCompletion(universe: Universe) {
        this.log("Matter is born in equal amounts with antimatter.");
        this.log("Maybe collecting common quarks will lead us to rarer types.");
    }

}

export class Quarks2 extends ResearchProject {

    constructor() {
        super("Matter: Quarks II", "Heavier quarks", 20, 0, 10);
    }

    preconditions(universe: Universe): boolean {
        const q1Researched = this.isResearched(universe, new Quarks1());
        const quarksCaught = (universe.particles["up quark"] || 0) +
                             (universe.particles["down quark"] || 0);
        return q1Researched && quarksCaught >= 10;
    }

    onCompletion(universe: Universe) {
        this.log("Quarks: strangeness and charm. Maybe there are still more to find?");
    }

}

export class Quarks3 extends ResearchProject {

    constructor() {
        super("Matter: Quarks III", "The heaviest quarks", 100, 0, 10);
    }

    preconditions(universe: Universe): boolean {
        const q2Researched = this.isResearched(universe, new Quarks2());
        const quarksCaught = (universe.particles["strange quark"] || 0) +
                             (universe.particles["charm quark"] || 0);
        return q2Researched && quarksCaught >= 10;
    }

    onCompletion(universe: Universe) {
        this.log("Quarks: from the top to the bottom. They might come in handy later.");
    }

}
