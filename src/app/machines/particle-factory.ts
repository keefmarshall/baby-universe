import { Globals } from '../globals';
import { Universe } from '../services/universe';

export class ParticleFactory {

    collectPhoton(universe: Universe) {
        // low energy photons, 0.1MeV to 1MeV. An annihilation between a positron
        // and electron at rest is about 0.5 MeV, for comparison.
        universe.energy += 0.5;
        universe.photonCount += 1;
    }
    
}
