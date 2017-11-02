import { KineticConstruction, KineticEngineering } from "app/research/kinetics";
import { ResearchProject } from "app/research/research-project";
import { Leptons } from "app/research/matter";

export class ResearchList {
    public projectList: Array<ResearchProject> = [];
    public projects = {};

    constructor() {
        this.projectList = [
            new KineticConstruction(),
            new KineticEngineering(),
            new Leptons()
        ];

        this.projectList.forEach(p => this.projects[p.name] = p);
    }
}
