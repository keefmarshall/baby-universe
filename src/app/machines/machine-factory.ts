import { Injectable } from '@angular/core';

import { UniverseService } from '../services/universe.service';

import { Machine } from './machine';

// Tediously import every bloody machine
import { PhotonCollector } from './photon-collector';
import { PhotonicPhilosopher } from 'app/machines/photonic-philosopher';
import { ResearchService } from 'app/services/research.service';
import { Assembler } from 'app/machines/assembler';
import { ConstructionService } from 'app/services/construction.service';
import { MeteringService } from 'app/services/metering.service';
import { FieldMirror } from 'app/machines/field-mirror';
import { StargameService } from 'app/games/stargame/stargame.service';
import { MatterDetector } from 'app/machines/matter-detector';
import { Paser } from 'app/machines/paser';
import { AssemblyPlant } from 'app/machines/assembly-plant';
import { QuarkScoop } from 'app/machines/quark-scoop';
import { QuarkSqueezer } from 'app/machines/quark-squeezer';
import { MatterFunnel } from 'app/machines/matter-funnel';
import { Thermometer } from 'app/machines/thermometer';
import { SpaceHeater } from 'app/machines/space-heater';
import { HeatingService } from 'app/services/heating.service';
import { HeatingArray } from 'app/machines/heating-array';
import { ThermalResistor } from 'app/machines/thermal-resistor';
import { ParticleAttractor } from 'app/machines/particle-attractor';
import { ParadoxGenerator } from 'app/machines/paradox-generator';
import { ThermalSpanner } from 'app/machines/thermal-spanner';
import { Supervisor } from 'app/machines/supervisor';
import { TickerService } from 'app/services/ticker.service';
import { LogService } from '../services/log.service';
import { PlasmaShockService } from '../services/plasma-shock.service';
import { Contraption } from './contraption';
import { RudimentaryResearcher } from './rudimentary-researcher';
import { ResearchTrackService } from '../services/research-track.service';
import { Contrecycler } from './contrecycler';
import { ContrivanceService } from '../services/contrivance.service';
import { Bodger } from './bodger';
import { MesonMaker } from './meson-manufacturer';
import { HadronService } from '../services/hadron.service';
import { BaryonBuilder } from './baryon-builder';
import { Contriver } from './contriver';
import { Repeater } from './repeater';
import { RepeaterService } from '../services/repeater.service';

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
        private logService: LogService,
        private researchService: ResearchService,
        private constructionService: ConstructionService,
        private contrivanceService: ContrivanceService,
        private meteringService: MeteringService,
        private stargameService: StargameService,
        private heatingService: HeatingService,
        private tickerService: TickerService,
        private plasmaShockService: PlasmaShockService,
        private researchTrackService: ResearchTrackService,
        private hadronService: HadronService,
        private repeaterService: RepeaterService
    ) {
        this.resetMachines();
    }

    resetMachines() {
        this.allMachines = {
            'PhotonCollector': new PhotonCollector(this.universeService, this.logService),
            'Paser': new Paser(this.universeService, this.logService),
            'PhotonicPhilosopher': new PhotonicPhilosopher(this.universeService, this.logService, this.researchService),
            'ParadoxGenerator': new ParadoxGenerator(this.universeService, this.logService),
            'Supervisor': new Supervisor(this.universeService, this.logService, this.tickerService),
            'FieldMirror': new FieldMirror(this.universeService, this.logService),
            'Assembler': new Assembler(this.universeService, this.logService, this.constructionService, this.meteringService),
            'AssemblyPlant': new AssemblyPlant(
                this.universeService, this.logService, this.constructionService, this.meteringService, this.researchService),
            'ThermalSpanner': new ThermalSpanner(this.universeService, this.logService, this.constructionService),
            'Thermometer': new Thermometer(this.universeService, this.logService, this.meteringService, this.plasmaShockService),
            'SpaceHeater': new SpaceHeater(this.universeService, this.logService, this.heatingService, this.meteringService),
            'HeatingArray': new HeatingArray(this.universeService, this.logService, this.heatingService, this.meteringService),
            'ThermalResistor': new ThermalResistor(this.universeService, this.logService),
            'MatterDetector': new MatterDetector(this.universeService, this.logService, this.stargameService),
            'QuarkScoop': new QuarkScoop(this.universeService, this.logService),
            'QuarkSqueezer': new QuarkSqueezer(this.universeService, this.logService),
            'MatterFunnel': new MatterFunnel(this.universeService, this.logService),
            'ParticleAttractor': new ParticleAttractor(this.universeService, this.logService),

            // PHASE TWO
            'Contraption': new Contraption(this.universeService, this.logService, this.constructionService, this.meteringService),
            'RudimentaryResearcher': new RudimentaryResearcher(
                this.universeService, this.logService, this.researchService, this.researchTrackService),
            'Contrecycler': new Contrecycler(this.universeService, this.logService, this.contrivanceService),
            'Bodger': new Bodger(this.universeService, this.logService, this.contrivanceService),
            'Repeater': new Repeater(this.universeService, this.logService, this.repeaterService),
            'Contriver': new Contriver(this.universeService, this.logService, this.contrivanceService),
            'MesonMaker': new MesonMaker(this.universeService, this.logService, this.hadronService),
            'BaryonBuilder': new BaryonBuilder(this.universeService, this.logService, this.hadronService)
        };

        this.allMachineNames = [];
        Object.keys(this.allMachines).forEach(m => this.allMachineNames.push(m));
    }

    newMachine(name: string): Machine {
        // console.log('Building machine of type ' + name);
        return this.allMachines[name];
    }

}
