import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";


export class Fermions extends ResearchProject {

    constructor() {
        super("Matter: Fermions", "The fundamental building blocks of Matter", 2);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, "PhotonicPhilosopher") > 0;
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
        return this.machineQuantity(universe, 'PhotonCollector') >= 50 &&
            universe.phase > 1;
    }

    onCompletion(universe: Universe) {
    }
}


export class QuarkUtils {

    randomQuark(universe: Universe): string {
        const ran = Math.random() * 100; // 0-99.9999
        // console.log("Random star: ran = " + ran);
        if (this.isResearched(universe, new Quarks3())) {
            // include tiny change of top and bottom quarks
            return ran < 60.5 ? "up quark" : // 60.5
                    ran < 91 ? "down quark" : // 30.5
                    ran < 95 ? "strange quark" : // 4
                        ran < 98.7 ? "charm quark" : // 3.7
                        ran < 99.4 ? "top quark" : "bottom quark"; // 0.7 : 0.6
        } else if (this.isResearched(universe, new Quarks2())) {
            return ran < 61 ? "up quark" : // 61
                    ran < 92 ? "down quark" : // 31
                    ran < 96 ? "strange quark" : "charm quark"; // 4 : 4
        } else { // assume Quarks1 has to be researched before we get here
            return ran < 65 ? "up quark" : "down quark";
        }
    }

    private isResearched(universe: Universe, project: ResearchProject): boolean {
        const props = universe.research[project.name];
        return props != null ? props.researched : false;
    }

}