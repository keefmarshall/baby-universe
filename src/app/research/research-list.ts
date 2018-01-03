import { KineticConstruction } from "app/research/kinetics";
import { KineticEnergyRecovery, KineticEngineering, Heat } from "app/research/kinetics2";
import { ResearchProject } from "app/research/research-project";
import { Leptons, Fermions, Quarks3, Quarks2, Quarks1 } from "app/research/matter";
import { Photovoltaics, LinearPolarisation, CircularPolarisation, EllipticalPolarisation,
     Photoelectrics, Reflection, Refraction } from "app/research/photons";
import { PhotonAmplification } from "app/research/amplification";
import { QuantumElectrodynamics, QuantumChromodynamics } from "app/research/collection";

export class ResearchList {
    public projectList: Array<ResearchProject> = [];
    public projects = {};

    constructor() {
        this.projectList = [
            new Photovoltaics(),
            new Photoelectrics(),
            new PhotonAmplification(),
            new LinearPolarisation(),
            new CircularPolarisation(),
            new EllipticalPolarisation(),
            new Reflection(),
            new Refraction(),
            new KineticConstruction(),
            new Heat(),
            new KineticEnergyRecovery(),
            new KineticEngineering(),
            new QuantumElectrodynamics(),
            new QuantumChromodynamics(),
            new Fermions(),
            new Quarks1(),
            new Quarks2(),
            new Quarks3(),
            new Leptons()
        ];

        this.projectList.forEach(p => this.projects[p.name] = p);
    }
}
