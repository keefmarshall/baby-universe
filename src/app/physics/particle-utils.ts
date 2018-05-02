import { Universe } from "../services/universe";
import { ALL_PARTICLES } from "./particle";

export class ParticleUtils {
    static initialiseParticles(type: string, u: Universe) {
        const p = ALL_PARTICLES[type];
        [p.code, p.antiparticleCode].forEach((code) => {
            if (!u.matter[code]) {
                u.matter[code] = 0;
            }
        });
    }
}
