import { Injectable } from '@angular/core';
import { UniverseService } from './universe.service';
import { Universe } from './universe';
import { MachineService } from './machine.service';
import { TickerService } from './ticker.service';
import { Globals } from '../globals';
import { LogService } from './log.service';
import { Subject } from 'rxjs/Subject';
import { ConstructionService } from './construction.service';
import { Contraption } from '../machines/contraption';
import { MeteringService } from './metering.service';


export enum ContrivanceEvent { NEW, FAULTY, BROKEN }

@Injectable()
export class ContrivanceService {
  state: ContrivanceState;
  events$ = new Subject<ContrivanceEvent>();

  isContriving = false;
  isRepairing = false;

  private breakCheckSeconds = 10;

  constructor(
    private universeService: UniverseService,
    private machineService: MachineService,
    private meteringService: MeteringService,
    private constructionService: ConstructionService,
    private tickerService: TickerService,
    private logService: LogService
  ) {
    this.initialiseFromUniverse(this.universeService.universe);
    this.tickerService.tick$.subscribe(n => this.onTick(n))
  }

  initialiseFromUniverse(u: Universe) {
    console.log("ContrivanceService initialising..");
    if (!u.contrivances || !u.contrivances['salvageStepsGenerated']) {
      console.log("ContrivanceService: empty, populating with defaults..")
      this.state = new ContrivanceState();
      this.state.lastBreakageAt = u.elapsedSeconds;
      u.contrivances = this.state;
    } else {
      console.log("ContrivanceService: setting from the universe")
      this.state = u.contrivances as ContrivanceState;
    }
  }

  buildContrivance(steps: number = 1) {
    this.state.constructionProgress += steps;
    if (this.state.constructionProgress >= this.state.constructionStepsRequired) {
      console.log("Contraption constructed.");
      // DO NOT use MachineFactory, due to cyclical dependency issues.
      const machine = new Contraption(this.universeService, this.logService,
                             this.constructionService, this.meteringService);
      this.machineService.addMachine(machine);
      this.contraptionProperties().workingContraptions ++;
      this.state.constructionProgress = 0;
      this.state.constructionProgressPercent = 0;
      this.events$.next(ContrivanceEvent.NEW);

      if (this.state.generatedTotal < 1) {
        this.logService.addLog("The contraption doesn't look very sturdy.")
        this.state.lastBreakageAt = this.universeService.universe.elapsedSeconds;
      }

      this.state.generatedTotal++;
    } else {
      this.state.constructionProgressPercent =
        this.state.constructionProgress * 100 / this.state.constructionStepsRequired;
    }
  }

  repairContrivance(steps: number = 1) {
    if (this.contraptionProperties().faultyContraptions > 0) {
      this.state.repairProgress += steps;
      if (this.state.repairProgress >= this.state.repairStepsRequired) {
        console.log("Contraption repaired.");
        this.contraptionProperties().faultyContraptions--;
        this.contraptionProperties().workingContraptions++;
        this.state.repairProgress = 0;
        this.state.repairProgressPercent = 0;
        this.events$.next(ContrivanceEvent.NEW);
        if (this.contraptionProperties().faultyContraptions === 0) {
          this.isRepairing = false;
        }
      } else {
        this.state.repairProgressPercent =
          this.state.repairProgress * 100 / this.state.repairStepsRequired;
      }
    }
  }

  salvageContrivance(count: number = 1) {
    const salvages = Math.min(count, this.contraptionProperties().brokenContraptions);
    if (salvages > 0) {
      this.contraptionProperties().brokenContraptions -= salvages;
      this.universeService.universe.machines['Contraption'].quantity -= salvages;
      for (let i = 0; i < salvages; i++) {
        if (this.contraptionProperties().faultyContraptions > 0) {
          this.repairContrivance(this.state.salvageStepsGenerated);
        } else {
          this.buildContrivance(this.state.salvageStepsGenerated);
        }
      }
    }
  }

  totalContrivances(): number {
    const cp = this.contraptionProperties()
    return cp == null ? 0 : cp.workingContraptions + cp.brokenContraptions + cp.faultyContraptions;
  }

  totalUnbrokenContrivances(): number {
    const cp = this.contraptionProperties()
    return cp == null ? 0 : cp.workingContraptions + cp.faultyContraptions;
  }

  contraptionProperties() {
    let cp = null;
    if (this.universeService.universe.machines['Contraption']) {
      cp = this.universeService.universe.machines['Contraption'].extras;
    }

    return cp;
  }

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  // Disruption / sabotage

  disrupt() {
    setTimeout(() => this.checkForBreakages(), 15000);
    setTimeout(() => this.checkForBreakages(), 30000);
    this.constructionService.sabotage();
  }

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  // Periodic breakages

  onTick(n: number) {
    if (this.universeService.universe.phase >= 2) {
      // every n seconds there is a chance something can break
      if (this.constructionService.isConstructing()) {
        const ticksPerCheck = this.breakCheckSeconds / Globals.secondsPerTick;
        if (Globals.tickFactor >= 100) {
          for (let i = 0; i < Globals.tickFactor * Globals.secondsPerTick / this.breakCheckSeconds; i++) {
            this.checkForBreakages();
          }
        } else if (n % Math.ceil(ticksPerCheck) === 0) {
          this.checkForBreakages();
        }
      }

      // These are for the press-and-hold feature:
      if (this.isContriving) {
        this.buildContrivance(0.5);
      }

      if (this.isRepairing) {
        this.repairContrivance(0.5);
      }
    } 
  }


  private checkForBreakages() {
    console.log("contrivance: checking for breakages");

    // I'm lazy
    const u = this.universeService.universe;
    const s = this.state;
    const cp = this.contraptionProperties();

    if (this.totalUnbrokenContrivances() === 0) {
      s.lastBreakageAt = u.elapsedSeconds; // don't penalise time with nothing
      return; // nothing to break!
    }

    // Chance increases with number of contraptions, time since last breakage
    // also tickFactor. But timeSinceLast will also increase rapidly if
    // we're in catchup, so we can maybe ignore tickFactor?
    const timeSinceLast = u.elapsedSeconds - s.lastBreakageAt;
    const timeFactor = timeSinceLast / s.maxLifetime;

    // 1 machine should always break after maxLifetime
    // chance of breaking this time is this.breakCheckSeconds * num / maxLifetime

    // Breakages before faults, otherwise a machine can go straight from working
    // to broken, if you get bad luck (I have seen this happen!)

    // BREAKAGES:
    if (cp.faultyContraptions > 0) {
      const breakChance = this.breakCheckSeconds * cp.faultyContraptions / s.maxLifetime;
      const breakRandom = Math.random();
      if ((breakChance + timeFactor) > breakRandom) {
        const q = Math.ceil(Math.random() * cp.faultyContraptions / 20); // always at least 1
        console.log(`New breaks! fc: ${breakChance}, tf: ${timeFactor}, fr: ${breakRandom}, q: ${q}`);
        cp.faultyContraptions -= q;
        cp.brokenContraptions += q;
        this.events$.next(ContrivanceEvent.BROKEN);
        s.lastBreakageAt = u.elapsedSeconds;
        if (cp.faultyContraptions < 1) { // nothing to repair
          s.repairProgress = 0;
          s.repairProgressPercent = 0;
        }
      }
    }

    // FAULTS:
    if (cp.workingContraptions > 0) {
      const faultChance = this.breakCheckSeconds * cp.workingContraptions / s.maxLifetime;
      const faultRandom = Math.random();
      if ((faultChance + timeFactor) > faultRandom) {
        const q = Math.ceil(Math.random() * cp.workingContraptions / 20); // always at least 1
        console.log(`New faults! fc: ${faultChance}, tf: ${timeFactor}, fr: ${faultRandom}, q: ${q}`);
        cp.workingContraptions -= q;
        cp.faultyContraptions += q;
        this.events$.next(ContrivanceEvent.FAULTY);
        s.lastBreakageAt = u.elapsedSeconds;
      }
    }

  }

}

// This has to be kept simple as it will be serialised/deserialised
// to and from JSON as part of the Universe object
class ContrivanceState {
  generatedTotal: number = 0;
  lastBreakageAt: number = 0; // elapsed seconds
  maxLifetime: number = 1800; // 30 minutes

  salvageStepsGenerated: number = 5;

  constructionProgress: number = 0;
  constructionProgressPercent: number = 0;
  constructionStepsRequired: number = 20;

  repairProgress: number = 0;
  repairProgressPercent: number = 0;
  repairStepsRequired: number = 10;
}
