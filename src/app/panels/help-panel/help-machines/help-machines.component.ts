import { Component, OnInit } from '@angular/core';
import { MachineFactory } from 'app/machines/machine-factory';
import { UniverseService } from 'app/services/universe.service';
import { Machine } from 'app/machines/machine';

@Component({
  selector: 'app-help-machines',
  templateUrl: './help-machines.component.html',
  styleUrls: ['./help-machines.component.scss']
})
export class HelpMachinesComponent implements OnInit {
  public machines: Array<Machine>;

  constructor(
    public machineFactory: MachineFactory,
    public universeService: UniverseService
  ) { }

  ngOnInit() {
    this.machines = this.machineFactory.allMachineNames.map(name => {
      return this.machineFactory.newMachine(name);
    }).filter(machine => {
      return machine.canSee || this.universeService.universe.machines[machine.name];
    })
  }

}
