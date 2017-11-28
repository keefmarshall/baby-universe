import { Component, Input, OnInit } from '@angular/core';

import { Machine } from '../../machines/machine';
import { MachineFactory } from '../../machines/machine-factory';
import { MachineService } from '../../services/machine.service';
import { ConstructionService } from 'app/services/construction.service';
import { ConstructionProject } from 'app/machines/construction-project';

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
    private machineFactory: MachineFactory,
    private constructionService: ConstructionService
  ) { }

  ngOnInit() {
    this.machine = this.machineFactory.newMachine(this.machineName)
  }

  deployMachine() {
    if (this.machine.needsConstruction) {
      this.startConstruction(this.machine as ConstructionProject);
    } else {
      if (this.machine.payFor(1)) {
        this.machineService.addMachine(this.machine);
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
}
