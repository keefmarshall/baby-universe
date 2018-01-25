import { Machine, MachineProperties } from "app/machines/machine";
import { Universe } from "app/services/universe";
import { UniverseService } from "app/services/universe.service";
import { Globals } from "app/globals";
import { ResearchProject } from "app/research/research-project";
import { ResearchList } from "app/research/research-list";
import { ResearchService } from "app/services/research.service";

export class PhotonicPhilosopher extends Machine {

    private baseEnergyCost = 500;
    private costMultiplier = 1.05;

    constructor(
        universeService: UniverseService,
        private researchService: ResearchService
     ) {
        super('PhotonicPhilosopher',
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
        // return Globals.round(this.energyCost(amount), 1) + ' MeV';
        // return this.numberFormatter.numberWithCommas(Globals.round(this.energyCost(amount), 1)) + ' MeV';
        // this, for some reason returns 5e2 for 500 :(
        return this.numberFormatter.abbreviateNumber(this.energyCost(amount) * 1e6) + 'eV';
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
        const q = this.properties().quantity || 0;

        const cost = this.baseEnergyCost *
            Globals.geometricProgressionSum(q, q + amount - 1, this.costMultiplier);

        return cost;
    }

    // costMultiplier(): number {
    //     const q = this.properties().quantity || 0;
    //     // let cm = 0.5;
    //     // if (q === 1) cm = 0.65;
    //     // if (q === 2) cm = 0.8;
    //     // if (q > 2) cm = 1;
    //     // if (q >= 10) cm = 2;
    //     // if (q >= 25) cm = 3;
    //     // if (q >= 50) cm = 5;
    //     // if (q >= 75) cm = 10;
    //     // if (q >= 100) cm = 20;
    //     // if (q >= 150) cm = 50;
    //     // if (q >= 200) cm = Math.pow(q, 1.1);
    //     const cm = Math.pow(q, Math.SQRT2);

    //     return cm;
    // }

}
