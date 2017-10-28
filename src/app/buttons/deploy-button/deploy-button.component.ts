import { Component, Input, OnInit } from '@angular/core';

import { Machine } from '../../machines/machine';
import { MachineFactory } from '../../machines/machine-factory';
import { MachineService } from '../../services/machine.service';

@Component({
  selector: 'app-deploy-button',
  templateUrl: './deploy-button.component.html',
  styleUrls: ['./deploy-button.component.css']
})
export class DeployButtonComponent implements OnInit {
  @Input() machineName: string;
  machine: Machine;

  constructor(
    private machineService: MachineService,
    private machineFactory: MachineFactory
  ) { }

  ngOnInit() {
    this.machine = this.machineFactory.newMachine(this.machineName)
  }

  deployMachine() {
    if (this.machine.payFor(1)) {
      this.machineService.addMachine(this.machine);
      console.log("Deployed " + this.machineName + "!");
    } else {
      console.log("Can't afford new " + this.machineName + "!");
    }
  }

}
