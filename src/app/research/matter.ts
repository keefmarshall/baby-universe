import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";
import * as Collections from 'typescript-collections';


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
        this.log("Matter is born in equal amounts with antimatter.");
        this.log("If we collect some common quarks, maybe we can discover more types.");
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
        this.log("Quarks: strangeness and charm. Maybe there are still more to find?");
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
        this.log("Quarks: from the top to the bottom. They might come in handy later.");
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
            // include tiny chance of top and bottom quarks
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

    randomQuarks(universe: Universe, count: number = 1): Collections.Bag<string> {
        const qbag = new Collections.Bag<string>();
        // If less than 85, we need to generate individual quarks randomly otherwise
        // you'll never get the rarer quarks. Otherwise, just generate a constant
        // distribution.

        // NB there is a chance you might get a slightly different count than
        // requested due to the distribution mechanism

        if (count < 85) {
            for (let i = 0; i < count; i++) {
                qbag.add(this.randomQuark(universe));
            }
        } else {
            // it depends on what has been researched
            if (this.isResearched(universe, new Quarks3())) {
                // include tiny chance of top and bottom quarks
                qbag.add("up quark", Math.round(count * 0.605));
                qbag.add("down quark", Math.round(count * 0.305));
                qbag.add("strange quark", Math.round(count * 0.04));
                qbag.add("charm quark", Math.round(count * 0.037));
                qbag.add("top quark", Math.round(count * 0.007));
                qbag.add("bottom quark", Math.round(count * 0.006));
            } else if (this.isResearched(universe, new Quarks2())) {
                qbag.add("up quark", Math.round(count * 0.61));
                qbag.add("down quark", Math.round(count * 0.31));
                qbag.add("strange quark", Math.round(count * 0.04));
                qbag.add("charm quark", Math.round(count * 0.04));
            } else { // assume Quarks1 has to be researched before we get here
                qbag.add("up quark", Math.round(count * 0.65));
                qbag.add("down quark", Math.round(count * 0.35));
            }
        }

        return qbag;
    }

    private isResearched(universe: Universe, project: ResearchProject): boolean {
        const props = universe.research[project.name];
        return props != null ? props.researched : false;
    }

}