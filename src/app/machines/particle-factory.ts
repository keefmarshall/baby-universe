import { Globals } from '../globals';
import { Universe } from '../services/universe';
import { LogService } from '../services/log.service';

export class ParticleFactory {

    collectPhoton(universe: Universe, logService: LogService, count: number = 1) {
        // low energy photons, 0.1MeV to 1MeV. An annihilation between a positron
        // and electron at rest is about 0.5 MeV, for comparison.
        universe.energy += (0.5 * count);
        universe.photonCount += (1 * count);

        if (universe.photonCount === 1) {
            logService.addLog("It all begins with one photon, harvested from the void and stored as pure energy.");
        }
        if (universe.photonCount === 10) {
            logService.addLog("Stored energy can be useful.");
        }
    }

    collectQuark(universe: Universe, type: string, count: number = 1) {
        // Every quark has to be created with an anti-quark, that's just the way it is
        // [actually not quite - the balance has to be correct, but we're simplifying here]
        // [[ and at some point we have to worry about Baryogenesis.. oh dear..]]
        if (universe.particles[type] == null) {
            universe.particles[type] = 0;
            universe.antiparticles[type] = 0;
        }

        universe.particles[type] += count;
        universe.antiparticles[type] += count;
    }

    collectGluons(universe: Universe, count: number = 1) {
        if (universe.particles['gluon'] == null) {
            universe.particles['gluon'] = 0;
        }

        universe.particles['gluon'] += count;
    }
}
