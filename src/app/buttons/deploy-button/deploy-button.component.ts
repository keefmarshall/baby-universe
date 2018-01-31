import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Machine } from '../../machines/machine';
import { MachineFactory } from '../../machines/machine-factory';
import { MachineService } from '../../services/machine.service';
import { ConstructionService } from 'app/services/construction.service';
import { ConstructionProject } from 'app/machines/construction-project';

@Component({
  selector: 'app-deploy-button',
  templateUrl: './deploy-button.component.html',
  styleUrls: ['./deploy-button.component.css'],
  encapsulation: ViewEncapsulation.None // this is so we can adjust the tooltip styling
})
export class DeployButtonComponent implements OnInit {
  @Input() machineName: string;

  machine: Machine;
  quantity: number = 1;

  private _multiplier: number = 1;

  constructor(
    private machineService: MachineService,
    private machineFactory: MachineFactory,
    private constructionService: ConstructionService
  ) { }

  // The odd dividing by 1 here is to ensure JS treats the input
  // as numeric, otherwise we get very weird stuff happening.
  @Input() set multiplier(value: number) {
    this._multiplier = value / 1;
    if (this.machine && this.machine.canBuyMultiple) {
      this.quantity = value / 1;
    } else {
      this.quantity = 1;
    }
  }

  get multiplier(): number {
    return this._multiplier;
  }

  ngOnInit() {
    this.machine = this.machineFactory.newMachine(this.machineName);
  }

  deployMachine() {
    if (this.machine.needsConstruction) {
      this.startConstruction(this.machine as ConstructionProject);
    } else {
      if (this.machine.payFor(this.quantity)) {
        this.machineService.addMachine(this.machine, this.quantity);
        console.log("Deployed " + this.machineName + "!");
      } else {
        console.log("Can't afford new " + this.machineName + "!");
      }
    }
  }

  startConstruction(project: ConstructionProject) {
    project.setMachineService(this.machineService);
    this.constructionService.construct(project);
  }

  canBuy() {
    switch (this.quantity) {
      case 1: return this.machine.canBuy;
      case 10: return this.machine.canBuy10;
      case 20: return this.machine.canBuy20;
      case 50: return this.machine.canBuy50;
    }
  }
}
