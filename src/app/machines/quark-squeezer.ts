import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { ParticleFactory } from "app/machines/particle-factory";
import { QuantumChromodynamics } from "app/research/collection";
import { LogService } from "../services/log.service";

export class QuarkSqueezer extends ConstructionProject {
    private particleFactory = new ParticleFactory();

    constructor(
        universeService: UniverseService,
        logService: LogService
    ) {
        super('QuarkSqueezer',
            "Quark Squeezer",
            "Compress quarks to produce gluons",
            universeService, logService, 25000, 1.1);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }

    onTick(tickFactor: number) {
        const u = this.universeService.universe;
        let totalQuarks = 0;
        Object.keys(u.particles).forEach(particle => {
            if (particle.endsWith('quark')) {
                totalQuarks += u.particles[particle];
            }
        });

        const q = Math.ceil(totalQuarks * this.properties().efficiency * 0.0005 * tickFactor);

        this.particleFactory.collectGluons(u, q);
    }

    preconditions(): boolean {
        return this.isResearched(new QuantumChromodynamics()) &&
            this.machineQuantity("QuarkSqueezer") === 0; // there can only be one
    }
}
