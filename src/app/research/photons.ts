import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";
import { PhotonCollector } from "app/machines/photon-collector";
import { PhotonicPhilosopher } from "app/machines/photonic-philosopher";
import { KineticEngineering } from "app/research/kinetics2";
import { SuperscalarPipelining } from "app/research/assembly";

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
        this.log("Efficient collectors absorb more photons.");
    }
}

export class QuantumPhotovoltaics extends ResearchProject {

    constructor() {
        super("Quantum Photovoltaics", "Trebles efficiency of Photon Collectors", 125);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new Photovoltaics());
    }

    onCompletion(universe: Universe) {
        // in theory we can't get here without at least some photon collectors
        universe.machines['PhotonCollector'].efficiency *= 3;
        this.log("More energy!");
    }
}

export class Photoelectrics extends ResearchProject {

    constructor() {
        super("Photoelectrics", "Quadruples efficiency of Photon Collectors", 850);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new QuantumPhotovoltaics());
    }

    onCompletion(universe: Universe) {
        // in theory we can't get here without at least some photon collectors
        universe.machines['PhotonCollector'].efficiency *= 4;
        this.log("Super-efficient collectors absorb many more photons.");
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
        super("Elliptical Polarisation", "Quadruples efficiency of Philosophers", 700);
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
        super("Reflection", "Allows building more Philosophers", 15);
    }

    preconditions(universe: Universe): boolean {
        return true;
    }

    onCompletion(universe: Universe) {
        universe.machines['PhotonicPhilosopher'].extras.maxAllowed += 5;
    }
}

export class HemisphericalReflectance extends ResearchProject {

    constructor() {
        super("Hemispherical Reflectance", "New field mirrors are twice as effective", 2000);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, "FieldMirror") >= 7;
    }

    onCompletion(universe: Universe) {
        universe.machines['FieldMirror'].efficiency *= 2;
    }
}

export class DirectionalReflectance extends ResearchProject {

    constructor() {
        super("Directional Reflectance", "New field mirrors are twice as effective", 9000);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, "FieldMirror") >= 12 && 
            this.isResearched(universe, new HemisphericalReflectance());
    }

    onCompletion(universe: Universe) {
        universe.machines['FieldMirror'].efficiency *= 2;
    }
}

export class Refraction extends ResearchProject {

    constructor() {
        super("Refraction", "Greatly increases Philosopher efficiency", 4500);
    }

    preconditions(universe: Universe): boolean {
        return this.isResearched(universe, new EllipticalPolarisation()) &&
            this.machineQuantity(universe, 'PhotonicPhilosopher') >= 50;
    }

    onCompletion(universe: Universe) {
        universe.machines['PhotonicPhilosopher'].efficiency *= 5;
    }
}

export class IntelligentAssembly extends ResearchProject {

    constructor() {
        super("Intelligent Assembly", "Idle philosophers optimise assembly plant processes", 50000);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, 'AssemblyPlant') >= 20 && this.isResearched(universe, new SuperscalarPipelining());
    }

    onCompletion(universe: Universe) {
        // see assembly plant
    }
}

export class MultiLevelSequencePlanning extends ResearchProject {

    constructor() {
        super("Multi-Level Sequence Planning", "Treble intelligent assembly boost from idle philosophers", 100000);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, 'AssemblyPlant') >= 30 && this.isResearched(universe, new IntelligentAssembly());
    }

    onCompletion(universe: Universe) {
        // see assembly plant
    }
}
