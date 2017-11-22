import { Machine, MachineProperties } from "app/machines/machine";
import { Universe } from "app/services/universe";
import { UniverseService } from "app/services/universe.service";
import { Globals } from "app/globals";
import { ResearchProject } from "app/research/research-project";
import { ResearchList } from "app/research/research-list";
import { ResearchService } from "app/services/research.service";

export class PhotonicPhilosopher extends Machine {

    private baseEnergyCost = 1000;

    constructor(
        universeService: UniverseService,
        private researchService: ResearchService
     ) {
        super(PhotonicPhilosopher.name, 
            "Photonic Philosopher",
            "Conducts scientific research",
            universeService);
    }

    // ////////////////////////////////
    // Abstract method implementations

    onTick() {
        const science = this.properties().quantity * this.properties().efficiency;
        this.researchService.addScience(science);
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

            const q = this.properties().quantity || 0;
            if (q === 0) {
                this.universeService.universe.logs.push(
                    "A world of knowledge opens up."
                );
            }
            
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
        if (q >= 25) cm = 3;
        if (q >= 50) cm = 5;
        if (q >= 80) cm = 10;
        if (q >= 150) cm = 50;
        
        return cm;
    }

}
