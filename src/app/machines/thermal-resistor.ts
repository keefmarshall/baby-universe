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
            universeService, 100000, 1.6);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick() {
        // does nothing - see Heating Array code for details
    }

    preconditions(): boolean {
        return this.isResearched(new AdvancedThermodynamics())
    }

}
