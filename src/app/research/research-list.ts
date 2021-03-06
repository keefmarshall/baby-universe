import { KineticConstruction } from "app/research/kinetics";
import { KineticEnergyRecovery, KineticEngineering, Heat, HeatEngines, HeatPumps, AdvancedThermodynamics } from "app/research/kinetics2";
import { ResearchProject } from "app/research/research-project";
import { Leptons, Fermions, Quarks3, Quarks2, Quarks1 } from "app/research/matter";
import { Photovoltaics, LinearPolarisation, CircularPolarisation, EllipticalPolarisation,
     Photoelectrics, Reflection, Refraction, IntelligentAssembly, HemisphericalReflectance,
     DirectionalReflectance, QuantumPhotovoltaics, MultiLevelSequencePlanning } from "app/research/photons";
import { PhotonAmplification, QSwitching, ModeLocking } from "app/research/amplification";
import { QuantumElectrodynamics, QuantumChromodynamics, ColourDeconfinement } from "app/research/collection";
import { BulkDeployment, AdvancedBulkDeployment } from "app/research/bulk-deployment";
import { InstructionPipelining, SuperscalarPipelining } from "app/research/assembly";

export class ResearchList {
    public projectList: Array<ResearchProject> = [];
    public projects = {};

    constructor() {
        this.projectList = [
            new Photovoltaics(),
            new QuantumPhotovoltaics(),
            new Photoelectrics(),
            new PhotonAmplification(),
            new QSwitching(),
            new ModeLocking(),
            new BulkDeployment(),
            new AdvancedBulkDeployment(),
            new LinearPolarisation(),
            new CircularPolarisation(),
            new EllipticalPolarisation(),
            new Refraction(),
            new Reflection(),
            new HemisphericalReflectance(),
            new DirectionalReflectance(),
            new KineticConstruction(),
            new IntelligentAssembly(),
            new MultiLevelSequencePlanning(),
            new Heat(),
            new HeatEngines(),
            new HeatPumps(),
            new AdvancedThermodynamics(),
            new KineticEnergyRecovery(),
            new KineticEngineering(),
            new InstructionPipelining(),
            new SuperscalarPipelining(),
            new QuantumElectrodynamics(),
            new QuantumChromodynamics(),
            new ColourDeconfinement(),
            new Fermions(),
            new Quarks1(),
            new Quarks2(),
            new Quarks3(),
            new Leptons()
        ];

        this.projectList.forEach(p => this.projects[p.name] = p);
    }
}
