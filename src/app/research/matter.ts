import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonCollector } from "app/machines/photon-collector";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";


export class Fermions extends ResearchProject {

    constructor() {
        super("Matter: Fermions", "The fundamental building blocks of Matter", 2);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, PhotonicPhilosopher.name) > 0;
    }

    onCompletion(universe: Universe) {
    }

}

export class Quarks1 extends ResearchProject {

    constructor() {
        super("Matter: Quarks I", "The most common flavours of quark", 3);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Fermions());
    }

    onCompletion(universe: Universe) {
        universe.logs.push("Matter is born in equal amounts with antimatter. " + 
                            "Now the collection can commence.");
    }

}

export class Quarks2 extends ResearchProject {

    constructor() {
        super("Matter: Quarks II", "Heavier quarks", 20);
    }

    preconditions(universe: Universe): boolean {
        const q1Researched = this.isResearched(universe, new Quarks1());
        const quarksCaught = (universe.particles["up quark"] || 0) +
                             (universe.particles["down quark"] || 0);
        return q1Researched && quarksCaught >= 10;
    }

    onCompletion(universe: Universe) {
    }

}

export class Quarks3 extends ResearchProject {

    constructor() {
        super("Matter: Quarks III", "The heaviest quarks", 100);
    }

    preconditions(universe: Universe): boolean {
        const q2Researched = this.isResearched(universe, new Quarks2());
        const quarksCaught = (universe.particles["strange quark"] || 0) +
                             (universe.particles["charm quark"] || 0);
        return q2Researched && quarksCaught >= 10;
    }

    onCompletion(universe: Universe) {
    }

}


export class Leptons extends ResearchProject {

    constructor() {
        super("Matter: Leptons", "Simple building blocks of Matter", 10);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, PhotonCollector.name) >= 50 &&
            universe.phase > 1;
    }

    onCompletion(universe: Universe) {
    }
}
