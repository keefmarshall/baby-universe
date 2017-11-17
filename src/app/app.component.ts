import { Component, OnInit } from '@angular/core';
import { AutosaveService } from './services/autosave.service';
import { MachineService } from './services/machine.service';
import { TimeService } from './services/time.service';
import { PhotonicPhilosopher } from 'app/machines/photonic-philosopher';
import { Assembler } from 'app/machines/assembler';
import { UniverseService } from 'app/services/universe.service';
import { StateManagementService } from 'app/services/state-management.service';
import { Quarks1 } from 'app/research/matter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Baby Universe';

  // Add services here to ensure they're started at application
  // load time, otherwise things may not get kicked off correctly.
  constructor(
    private autosaveService: AutosaveService,
    private machineService: MachineService,
    private stateManagementService: StateManagementService,
    private timeService: TimeService,
    private universeService: UniverseService
  ) { }

  ngOnInit() {
    this.autosaveService.enabled = true;
  }

  showDeploymentPanel(): boolean {
    return this.universeService.universe.photonCount >= 10;
  }
  
  showResearchPanel(): boolean {
    return this.machineService.exists(PhotonicPhilosopher.name);
  }

  showConstructionPanel(): boolean {
    return this.machineService.exists(Assembler.name);
  }

  showMatterCollectionPanel(): boolean {
    const props = this.universeService.universe.research[new Quarks1().name];
    return props != null ? props.researched : false;
  }
}
