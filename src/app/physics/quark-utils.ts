import { Universe } from "../services/universe";
import { Quarks2, Quarks3 } from "../research/matter";
import * as Collections from 'typescript-collections';
import { ResearchProject } from "../research/research-project";

export class QuarkUtils {

    randomQuark(universe: Universe): string {
        const ran = Math.random() * 100; // 0-99.9999
        // console.log("Random star: ran = " + ran);
        if (this.isResearched(universe, new Quarks3())) {
            // include tiny chance of top and bottom quarks
            return ran < 60.5 ? "u" : // 60.5
                    ran < 91 ? "d" : // 30.5
                    ran < 95 ? "s" : // 4
                        ran < 98.7 ? "c" : // 3.7
                        ran < 99.4 ? "t" : "b"; // 0.7 : 0.6
        } else if (this.isResearched(universe, new Quarks2())) {
            return ran < 61 ? "u" : // 61
                    ran < 92 ? "d" : // 31
                    ran < 96 ? "s" : "c"; // 4 : 4
        } else { // assume Quarks1 has to be researched before we get here
            return ran < 65 ? "u" : "d";
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
                qbag.add("u", Math.round(count * 0.605));
                qbag.add("d", Math.round(count * 0.305));
                qbag.add("s", Math.round(count * 0.04));
                qbag.add("c", Math.round(count * 0.037));
                qbag.add("t", Math.round(count * 0.007));
                qbag.add("b", Math.round(count * 0.006));
            } else if (this.isResearched(universe, new Quarks2())) {
                qbag.add("u", Math.round(count * 0.61));
                qbag.add("d", Math.round(count * 0.31));
                qbag.add("s", Math.round(count * 0.04));
                qbag.add("c", Math.round(count * 0.04));
            } else { // assume Quarks1 has to be researched before we get here
                qbag.add("u", Math.round(count * 0.65));
                qbag.add("d", Math.round(count * 0.35));
            }
        }

        return qbag;
    }

    private isResearched(universe: Universe, project: ResearchProject): boolean {
        const props = universe.research[project.name];
        return props != null ? props.researched : false;
    }

}
