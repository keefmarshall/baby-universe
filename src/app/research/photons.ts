import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonCollector } from "app/machines/photon-collector";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";
import { KineticEngineering } from "app/research/kinetics2";

export class Photovoltaics extends ResearchProject {

    constructor() {
        super("Photovoltaics", "Doubles efficiency of Photon Collectors", 1);
    }

    preconditions(universe: Universe): boolean {
        return true;
    }

    onCompletion(universe: Universe) {
        // in theory we can't get here without at least some photon collectors
        universe.machines['PhotonCollector'].efficiency *= 2;
        universe.logs.push("Efficient collectors absorb more photons.");
    }
}

export class Photoelectrics extends ResearchProject {

    constructor() {
        super("Photoelectrics", "Quadruples efficiency of Photon Collectors", 450);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Photovoltaics());
    }

    onCompletion(universe: Universe) {
        // in theory we can't get here without at least some photon collectors
        universe.machines['PhotonCollector'].efficiency *= 4;
        universe.logs.push("Super-efficient collectors absorb many more photons.");
    }
}

export class LinearPolarisation extends ResearchProject {

    constructor() {
        super("Linear Polarisation", "Doubles efficiency of Philosophers", 5);
    }

    preconditions(universe: Universe): boolean {
        return true;
    }

    onCompletion(universe: Universe) {
        universe.machines['PhotonicPhilosopher'].efficiency *= 2;
    }
}

export class CircularPolarisation extends ResearchProject {

    constructor() {
        super("Circular Polarisation", "Trebles efficiency of Philosophers", 65);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new LinearPolarisation());
    }

    onCompletion(universe: Universe) {
        universe.machines['PhotonicPhilosopher'].efficiency *= 3;
    }
}

export class EllipticalPolarisation extends ResearchProject {

    constructor() {
        super("Elliptical Polarisation", "Quadruples efficiency of Philosophers", 800);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new CircularPolarisation());
    }

    onCompletion(universe: Universe) {
        universe.machines['PhotonicPhilosopher'].efficiency *= 4;
    }
}

export class Reflection extends ResearchProject {

    constructor() {
        super("Reflection", "Allows building more Philosophers", 30);
    }

    preconditions(universe: Universe): boolean {
        return true;
    }

    onCompletion(universe: Universe) {
        universe.machines['PhotonicPhilosopher'].extras.maxAllowed += 5;
    }
}

export class Refraction extends ResearchProject {

    constructor() {
        super("Refraction", "Greatly increases Philosopher efficiency", 4500);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new EllipticalPolarisation()) &&
            this.machineQuantity(universe, 'PhotonicPhilosopher') > 50;
    }

    onCompletion(universe: Universe) {
        universe.machines['PhotonicPhilosopher'].efficiency *= 5;
    }
}
