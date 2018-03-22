import { Injectable } from '@angular/core';
import { UniverseService } from './universe.service';
import { Universe } from './universe';
import { MachineFactory } from '../machines/machine-factory';
import { MachineService } from './machine.service';

@Injectable()
export class ContrivanceService {
  state: ContrivanceState;

  constructor(
    private universeService: UniverseService,
    private machineFactory: MachineFactory,
    private machineService: MachineService
  ) {
    this.initialiseFromUniverse(this.universeService.universe);
  }

  initialiseFromUniverse(u: Universe) {
    if (!u.contrivances || u.contrivances === {}) {
      this.state = new ContrivanceState();
      u.contrivances = new ContrivanceState();
    } else {
      this.state = u.contrivances as ContrivanceState;
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
      } else {
        this.state.repairProgressPercent =
          this.state.repairProgress * 100 / this.state.repairStepsRequired;
      }
    }
  }

  salvageContrivance() {
    if (this.state.brokenContraptions > 0) {
      this.state.brokenContraptions--;
      this.buildContrivance(this.state.salvageStepsGenerated);
    }
  }
}

// This has to be kept simple as it will be serialised/deserialised
// to and from JSON as part of the Universe object
class ContrivanceState {
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
