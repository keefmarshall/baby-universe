import { KineticConstruction, KineticEngineering } from "app/research/kinetics";
import { ResearchProject } from "app/research/research-project";

export class ResearchList {
    public projectList: Array<ResearchProject> = [];
    public projects = {};

    constructor() {
        this.projectList = [
            new KineticConstruction(),
            new KineticEngineering()
        ];

        this.projectList.forEach(p => this.projects[p.name] = p);
    }
}
