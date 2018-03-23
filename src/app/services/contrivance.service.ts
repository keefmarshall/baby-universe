import { Injectable } from '@angular/core';
import { UniverseService } from './universe.service';
import { Universe } from './universe';
import { MachineFactory } from '../machines/machine-factory';
import { MachineService } from './machine.service';
import { TickerService } from './ticker.service';
import { Globals } from '../globals';
import { LogService } from './log.service';
import { Subject } from 'rxjs/Subject';


export enum ContrivanceEvent { NEW, FAULTY, BROKEN }

@Injectable()
export class ContrivanceService {
  state: ContrivanceState;
  events$ = new Subject<ContrivanceEvent>();

  private breakCheckSeconds = 10;

  constructor(
    private universeService: UniverseService,
    private machineFactory: MachineFactory,
    private machineService: MachineService,
    private tickerService: TickerService,
    private logService: LogService
  ) {
    this.initialiseFromUniverse(this.universeService.universe);
    this.tickerService.tick$.subscribe(n => this.onTick(n))
  }

  initialiseFromUniverse(u: Universe) {
    if (!u.contrivances || u.contrivances === {}) {
      this.state = new ContrivanceState();
      this.state.lastBreakageAt = u.elapsedSeconds;
      u.contrivances = this.state;
    } else {
      this.state = u.contrivances as ContrivanceState;
      if (!this.state.maxLifetime) { // TODO Remove
        this.state.maxLifetime = 1800;
      }
    }
  }

  buildContrivance(steps: number = 1) {
    this.state.constructionProgress += steps;
    if (this.state.constructionProgress >= this.state.constructionStepsRequired) {
      console.log("Contraption constructed.");
      const machine = this.machineFactory.newMachine("Contraption");
      this.machineService.addMachine(machine);
      this.state.workingContraptions ++;
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
    if (this.state.faultyContraptions > 0) {
      this.state.repairProgress += steps;
      if (this.state.repairProgress >= this.state.repairStepsRequired) {
        console.log("Contraption repaired.");
        this.state.faultyContraptions--;
        this.state.workingContraptions++;
        this.state.repairProgress = 0;
        this.state.repairProgressPercent = 0;
        this.events$.next(ContrivanceEvent.NEW);
      } else {
        this.state.repairProgressPercent =
          this.state.repairProgress * 100 / this.state.repairStepsRequired;
      }
    }
  }

  salvageContrivance() {
    if (this.state.brokenContraptions > 0) {
      this.state.brokenContraptions--;
      this.universeService.universe.machines['Contraption'].quantity--;
      this.buildContrivance(this.state.salvageStepsGenerated);
    }
  }

  totalContrivances(): number {
    const s = this.state
    return s.workingContraptions + s.brokenContraptions + s.faultyContraptions;
  }

  totalUnbrokenContrivances(): number {
    const s = this.state
    return s.workingContraptions + s.faultyContraptions;
  }


  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  // Period breakages

  onTick(n: number) {
    // every n seconds there is a chance something can break
    const ticksPerCheck = this.breakCheckSeconds / (Globals.secondsPerTick * Globals.tickFactor);
    if (n % Math.ceil(ticksPerCheck) === 0) {
      this.checkForBreakages();
    }
  }


  private checkForBreakages() {
    console.log("contrivance: checking for breakages");

    // I'm lazy
    const u = this.universeService.universe;
    const s = this.state;

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
    if (s.faultyContraptions > 0) {
      const breakChance = this.breakCheckSeconds * s.faultyContraptions / s.maxLifetime;
      const breakRandom = Math.random();
      if ((breakChance + timeFactor) > breakRandom) {
        const q = Math.ceil(Math.random() * s.faultyContraptions / 20); // always at least 1
        console.log(`New breaks! fc: ${breakChance}, tf: ${timeFactor}, fr: ${breakRandom}, q: ${q}`);
        s.faultyContraptions -= q;
        s.brokenContraptions += q;
        this.events$.next(ContrivanceEvent.BROKEN);
        s.lastBreakageAt = u.elapsedSeconds;
        if (s.faultyContraptions < 1) { // nothing to repair
          s.repairProgress = 0;
          s.repairProgressPercent = 0;
        }
      }
    }

    // FAULTS:
    if (s.workingContraptions > 0) {
      const faultChance = this.breakCheckSeconds * s.workingContraptions / s.maxLifetime;
      const faultRandom = Math.random();
      if ((faultChance + timeFactor) > faultRandom) {
        const q = Math.ceil(Math.random() * s.workingContraptions / 20); // always at least 1
        console.log(`New faults! fc: ${faultChance}, tf: ${timeFactor}, fr: ${faultRandom}, q: ${q}`);
        s.workingContraptions -= q;
        s.faultyContraptions += q;
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

  workingContraptions: number = 0;
  faultyContraptions: number = 0; // faulty are repairable
  brokenContraptions: number = 0; // broken can be salvaged for steps towards a new machine

  salvageStepsGenerated: number = 5;

  constructionProgress: number = 0;
  constructionProgressPercent: number = 0;
  constructionStepsRequired: number = 20;

  repairProgress: number = 0;
  repairProgressPercent: number = 0;
  repairStepsRequired: number = 10;
}
