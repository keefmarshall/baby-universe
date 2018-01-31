import { ResearchProject } from "app/research/research-project";
import { Universe } from "app/services/universe";

export class BulkDeployment extends ResearchProject {

    constructor() {
        super("Bulk Deployment",
            "Deploy several machines at once",
            50);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, "PhotonCollector") >= 30;
    }

    onCompletion(universe: Universe) {
        universe.logs.push("Not all machines can be deployed in bulk.");
    }
}

export class AdvancedBulkDeployment extends ResearchProject {

    constructor() {
        super("Advanced Bulk Deployment",
            "Deploy many machines at once",
            1250);
    }

    preconditions(universe: Universe): boolean {
        return this.machineQuantity(universe, "PhotonCollector") >= 100 &&
            this.isResearched(universe, new BulkDeployment());
    }

    onCompletion(universe: Universe) {
        universe.logs.push("Deploying more at once saves time.");
    }
}
