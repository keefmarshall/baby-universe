import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonCollector } from "app/machines/photon-collector";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";

export class Photovoltaics extends ResearchProject {

    constructor() {
        super("Photovoltaics", "Doubles efficiency of Photon Collectors", 1);
    }

    preconditions(universe: Universe): boolean {
        return true;
    }

    onCompletion(universe: Universe) {
        // in theory we can't get here without at least some photon collectors
        universe.machines[PhotonCollector.name].efficiency *= 2;
    }
}

export class Photoelectrics extends ResearchProject {
    
    constructor() {
        super("Photoelectrics", "Quadruples efficiency of Photon Collectors", 500);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Photovoltaics());
    }

    onCompletion(universe: Universe) {
        // in theory we can't get here without at least some photon collectors
        universe.machines[PhotonCollector.name].efficiency *= 2;
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
        universe.machines[PhotonicPhilosopher.name].efficiency *= 2;
    }
}

export class CircularPolarisation extends ResearchProject {
    
    constructor() {
        super("Circular Polarisation", "Trebles efficiency of Philosophers", 150);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new LinearPolarisation());
    }

    onCompletion(universe: Universe) {
        universe.machines[PhotonicPhilosopher.name].efficiency *= 3;
    }
}

export class EllipticalPolarisation extends ResearchProject {
    
    constructor() {
        super("Elliptical Polarisation", "Quadruples efficiency of Philosophers", 3000);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new CircularPolarisation());
    }

    onCompletion(universe: Universe) {
        universe.machines[PhotonicPhilosopher.name].efficiency *= 4;
    }
}
