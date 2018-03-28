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
    const rr = this.universeService.universe.machines['RudimentaryResearcher'];
    rr.efficiency += (science * 0.00005);
  }

  improveContraptions(science: number) {
    // every 1 science improves contraption efficiency by 0.0001
    const c = this.universeService.universe.machines['Contraption'];
    c.efficiency += (science * 0.0001);

    // TODO: milestones to introduce new machines - or maybe this
    // is just handled in machine preconditions.
  }
}
