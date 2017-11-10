import { KineticConstruction, KineticEngineering } from "app/research/kinetics";
import { ResearchProject } from "app/research/research-project";
import { Leptons, Fermions, Quarks3, Quarks2, Quarks1 } from "app/research/matter";
import { Photovoltaics, LinearPolarisation, CircularPolarisation, EllipticalPolarisation,
     Photoelectrics, Reflection } from "app/research/photons";

export class ResearchList {
    public projectList: Array<ResearchProject> = [];
    public projects = {};

    constructor() {
        this.projectList = [
            new Photovoltaics(),
            new Photoelectrics(),
            new LinearPolarisation(),
            new CircularPolarisation(),
            new EllipticalPolarisation(),
            new Reflection(),
            new KineticConstruction(),
            new KineticEngineering(),
            new Fermions(),
            new Quarks1(),
            new Quarks2(),
            new Quarks3(),
            new Leptons()
        ];

        this.projectList.forEach(p => this.projects[p.name] = p);
    }
}
