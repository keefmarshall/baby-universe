import { Injectable } from '@angular/core';

import { UniverseService } from '../services/universe.service';

import { Machine } from './machine';

// Tediously import every bloody machine
import { PhotonCollector } from './photon-collector';
import { PhotonicPhilosopher } from 'app/machines/photonic-philosopher';
import { ResearchService } from 'app/services/research.service';
import { Assembler } from 'app/machines/assembler';
import { ConstructionService } from 'app/services/construction.service';
import { FieldMirror } from 'app/machines/field-mirror';

/**
 * This class exists solely so we can reconstruct a machine based on
 * the machine name alone. It essentially just maps names to classes.
 *
 * You don't need to use this if you already know the class of the machine.
 *
 * Any machine that can be added to the machine service has to be represented
 * here, otherwise we can't recover from a saved state correctly.
 */
@Injectable()
export class MachineFactory {
    allMachines: {};
    allMachineNames: Array<string> = [];

    constructor(
        private universeService: UniverseService,
        private researchService: ResearchService,
        private constructionService: ConstructionService
    ) {
        this.allMachines = {
            'PhotonCollector': new PhotonCollector(universeService),
            'PhotonicPhilosopher': new PhotonicPhilosopher(universeService, researchService),
            'Assembler': new Assembler(universeService, constructionService),
            'FieldMirror': new FieldMirror(universeService)
        };

        Object.keys(this.allMachines).forEach(m => this.allMachineNames.push(m));
    }

    newMachine(name: string): Machine {
        // console.log('Building machine of type ' + name);
        return this.allMachines[name];
    }

}
