import { Injectable } from '@angular/core';
import { UniverseService } from './universe.service';
import { LogService } from './log.service';

/**
 * This service handles research other than direct projects.
 * From Phase 2 onwards, you can assign researchers to other
 * topics, e.g. improve researching
 */
@Injectable()
export class ResearchTrackService {

  constructor(
    private universeService: UniverseService,
    private logService: LogService
  ) { }

  improveResearchers(science: number) {
    // every 1 science improves researcher efficiency by 0.0001
    this.improveMachine(science, 0.0001, 'RudimentaryResearcher');
  }

  improveContraptions(science: number) {
    // every 1 science improves contraption efficiency by 0.0001
    this.improveMachine(science, 0.0001, 'Contraption');
  }

  private improveMachine(science: number, factor: number, machineName: string) {
    const machine = this.universeService.universe.machines[machineName];
    let increment = (science * factor);
    if (machine.efficiency > 1) { // above 1, it gets much harder to improve
      increment /= machine.efficiency;
    }
    machine.efficiency += increment;
  }
}
