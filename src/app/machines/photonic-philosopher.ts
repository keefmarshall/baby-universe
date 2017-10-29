import { Machine, MachineProperties } from "app/machines/machine";
import { UniverseService } from "app/services/universe.service";
import { Globals } from "app/globals";
import { ResearchProject } from "app/research/research-project";

export class PhotonicPhilosopher extends Machine {

    private baseEnergyCost = 1000;

    public currentProject: ResearchProject = null;


    constructor(universeService: UniverseService) {
        super(PhotonicPhilosopher.name, 
            "photonic philosopher",
            "Conducts research",
            universeService);
    }

    // ////////////////////////////////
    // Abstract method implementations

    onTick() {
        if (this.currentProject != null) {
            const science = this.properties().quantity * this.properties().efficiency;
            this.currentProject.addScience(science);
            if (this.currentProject.isComplete()) {
                this.completeProject();
            }
        }
    }

    preconditions(): boolean {
        const pcprops = this.universeService.universe.machines['PhotonCollector'];
        if (pcprops != null) {
            return pcprops.quantity >= 10;
        } else {
            return false;
        }
    }

    displayCost(amount: number = 1): string {
        return Globals.round(this.energyCost(amount), 1) + ' MeV';
    }

    payFor(amount: number = 1): boolean {
        const cost = this.energyCost(amount);
        if (this.affordable(amount)) {
            this.universeService.universe.energy -= cost;
            return true;
        } else {
            return false;
        }
    }

    affordable(amount: number = 1): boolean {
        return (this.universeService.universe.energy >= this.energyCost(amount)) &&
            (this.properties().quantity + amount) <= this.properties().extras["maxAllowed"];
    }

    // override
    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.extras['maxAllowed'] = 10;
        props.efficiency = 0.001;
        return props;
    }

    // ////////////////////////////////
    // Internal functions

    energyCost(amount: number = 1): number {
        const cost = this.baseEnergyCost * this.costMultiplier() * amount;

        return cost;
    }

    costMultiplier(): number {
        const q = this.properties().quantity || 0;
        let cm = 1;
        if (q >= 10) cm = 2;
        if (q >= 50) cm = 5;

        return cm;
    }

    startProject(project: ResearchProject): boolean {
        if (this.properties().quantity > 0) {
            if (this.currentProject == null) {
                console.log("Starting new research project: " + this.currentProject.name);
                this.currentProject = project;
                return true;
            } else {
                console.log("Can't research new project, already busy!");
                return false;
            }
        } else {
            console.log("Can't research new project, no philosphers!");
            return false;
        }
    }

    completeProject() {
        console.log("Research complete: " + this.currentProject.name);
        this.currentProject = null;
    }

}
