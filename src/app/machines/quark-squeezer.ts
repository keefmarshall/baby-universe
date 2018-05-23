import { ConstructionProject } from "app/machines/construction-project";
import { UniverseService } from "app/services/universe.service";
import { QuantumChromodynamics } from "app/research/collection";
import { LogService } from "../services/log.service";
import { ParticleFactory } from "../physics/particle-factory";

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
        Object.keys(u.matter)
            .filter((k) => ["u", "d", "s", "c", "b", "t"].includes(k))
            .forEach(particle => {
                totalQuarks += u.matter[particle];
            });

        const q = Math.ceil(totalQuarks * this.properties().efficiency * 0.0005 * tickFactor);

        this.particleFactory.collectParticle(u, "g", q);
    }

    preconditions(): boolean {
        return this.isResearched(new QuantumChromodynamics())
            && this.machineQuantity("QuarkSqueezer") === 0 // there can only be one
            && this.universeService.universe.phase < 2;
    }
}
