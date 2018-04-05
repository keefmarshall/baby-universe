import { ConstructionProject } from "./construction-project";
import { UniverseService } from "../services/universe.service";
import { LogService } from "../services/log.service";
import { Pions } from "../research/matter2";
import { MachineProperties } from "./machine";

/**
 * NB this can only manufacture Pions and Kaons, we're not going
 * to bother with all the other random types, they have too short
 * a half life.
 */
export class MesonManufacturer extends ConstructionProject {
    private pionProgress = 0;
    private kaonProgress = 0;

    constructor(
        universeService: UniverseService,
        logService: LogService
     ) {
        super('MesonManufacturer',
            "Meson Manufacturer",
            "Manufactures Mesons",
            universeService,
            logService,
            100, 1.05);
    }

    onComplete() {
        this.machineService.addMachine(this);
    }


    private addParticle(type: string, count: number = 1) {
        const u = this.universeService.universe;
        u.particles[type] += count;
        u.antiparticles[type] += count;
    }

    private removeQuarks(type: string, count: number = 1) {
        const u = this.universeService.universe;
        u.particles[type + ' quark'] -= count;
        u.antiparticles[type + ' quark'] -= count;
    }

    onTick(factor: number) {
        const eff = this.properties().efficiency;
        const q = this.properties().quantity;
        const kaonAssigned = this.properties().extras['kaonAssigned'];
        const pionAssigned = q - kaonAssigned;

        // const prog = eff * q / 100;
        // this.pionProgress += prog * (100 - kp);
        // this.kaonProgress += prog * kp;
        this.pionProgress += eff * pionAssigned;
        this.kaonProgress += eff * kaonAssigned;

        if (this.pionProgress > 1) {
            const pions = Math.floor(this.pionProgress);
            if (this.canAfford('up', pions) && this.canAfford('down', pions)) {
                this.pionProgress = this.pionProgress % 1;
                this.addParticle('pion', pions);
                this.removeQuarks('up', pions);
                this.removeQuarks('down', pions);
            }
        }

        if (this.kaonProgress > 1) {
            const kaons = Math.floor(this.kaonProgress);
            if (this.canAfford('up', kaons) && this.canAfford('down', kaons)) {
                this.kaonProgress = this.kaonProgress % 1;
                this.addParticle('kaon', kaons);
                this.removeQuarks('up', kaons);
                this.removeQuarks('strange', kaons);
            }
        }
    }

    /**
     * To be honest, at time of writing it's highly unlikely that we'll run out of
     * quarks, but at some point during phase 2 they all need to be used up, so..
     */
    private canAfford(type, count): boolean {
        const u = this.universeService.universe;
        const t = `${type} quark`;
        return u.particles[t] && u.particles[t] >= count &&
            u.antiparticles[t] && u.antiparticles[t] >= count;
    }

    preconditions(): boolean {
        return this.isResearched(new Pions());
    }

    defaultProperties(): MachineProperties {
        const props = super.defaultProperties();
        props.efficiency = 0.01; // need room to improve
        props.extras = {
            kaonAssigned: 0
            // pionPercentage: 100 // proportion of effort spent making Pions over Kaons
        };
        return props;
    }
}
