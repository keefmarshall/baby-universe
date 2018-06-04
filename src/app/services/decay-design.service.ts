import { Injectable } from '@angular/core';
import { UniverseService } from './universe.service';
import { Globals } from '../globals';
import { DecayPattern, DECAY_PATTERNS } from '../physics/decay-pattern';
import { LogService } from './log.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecayDesignService {
  private readonly baseProgressRequired = 50;
  private readonly multiplier = 1.1;

  requiredForNext: number;
  events$ = new Subject<string>();

  constructor(
    private universeService: UniverseService,
    private logService: LogService
  ) {
    this.calculateRequiredForNext();
  }

  addProgress(count: number) {
    const u = this.universeService.universe;
    u.currentPatternDesignProgress += count;
    while (u.currentPatternDesignProgress >= this.requiredForNext) {
      u.currentPatternDesignProgress -= this.requiredForNext;
      this.newPattern();
    }
  }

  private calculateRequiredForNext() {
    const c = this.universeService.universe.decayPatterns.length;
    this.requiredForNext = this.baseProgressRequired *
          Globals.geometricProgressionSum(c, c, this.multiplier);
    console.log(`DecayDesigner: requiredForNext: ${this.requiredForNext}`);
  }

  newPattern() {
    this.calculateRequiredForNext();
    const availablePatterns = this.availablePatterns();
    console.log(`Got ${availablePatterns.length} available patterns`);
    if (availablePatterns.length > 0) {
      const rand = Math.floor(Math.random() * availablePatterns.length);
      const pattern = availablePatterns[rand];
      this.universeService.universe.decayPatterns.push(pattern);
      console.log(`Designed new deccay pattern: ${pattern}`);
      this.logService.addLog(
        `New decay pattern discovered: ${DECAY_PATTERNS[pattern].description}`);
      this.events$.next(pattern);
    } else {
      console.log("No new patterns available!");
    }
  }

  // returns pattern keys, not patterns
  private availablePatterns(): string[] {
//    console.log("Calculating available patterns..");
    const u = this.universeService.universe;
    return Object.keys(DECAY_PATTERNS)
      .filter((k) => !u.decayPatterns.includes(k))
      .filter((k) => {
        const pattern = DECAY_PATTERNS[k];
        const allReqs = pattern.results.concat(...pattern.inputs);
//        console.log(`${k}: AllReqs = ${JSON.stringify(allReqs)}`);
        const allDiscovered = allReqs.every((particle) => u.matter.hasOwnProperty(particle));
//        console.log(`${k}: allDiscovered = ${allDiscovered}`);
        return allDiscovered;
      });
  }
}
