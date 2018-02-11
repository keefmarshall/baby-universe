import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { AdvancedThermodynamics } from "app/research/kinetics2";

export class ThermalResistor extends ConstructionProject {
    constructor(
        universeService: UniverseService
    ) {
        super('ThermalResistor',
            "Thermal Resistor",
            "Protects heating array components, dramatically increasing energy draw",
            universeService, 500000, 1.45);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick(tickFactor: number) {
        // does nothing - see Heating Array code for details
    }

    preconditions(): boolean {
        const met = this.isResearched(new AdvancedThermodynamics()) &&
            this.machineQuantity("HeatingArray") > 19

        return met;
    }

    affordable(): boolean {
        return super.affordable() && this.enoughMatter();
    }

    // Override
    displayCost(count: number = 1): string {
        const extraText = this.enoughMatter() ? "" : " [requires more matter!]";
        return super.displayCost(count) + extraText;
    }

    private enoughMatter(): boolean {
        return this.universeService.universe.particles["gluon"] &&
            this.universeService.universe.particles["gluon"] >
                Math.pow(10, this.properties().quantity * 2);
    }
}
