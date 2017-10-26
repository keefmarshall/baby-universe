import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { UniverseService } from '../../services/universe.service';

import { MachineFactory } from '../../machines/machine-factory';
import { ParticleFactory } from '../../machines/particle-factory';
import { PhotonCollector } from '../../machines/photon-collector';

@Component({
  selector: 'app-dev-panel',
  templateUrl: './dev-panel.component.html',
  styleUrls: ['./dev-panel.component.css']
})
export class DevPanelComponent implements OnInit {
  private particleFactory = new ParticleFactory();

  constructor(
    private machineFactory: MachineFactory,
    private machineService: MachineService,
    private universeService: UniverseService
  ) { }

  ngOnInit() {
  }

  resetUniverse() {
    const confirm = window.confirm('Reset everything??');
    if (confirm) {
      this.universeService.resetUniverse();
      this.machineService.resetMachines();
    }
  }

  collectPhoton() {
    console.log('Collected photon!');
    this.particleFactory.collectPhoton(this.universeService.universe);
  }

  deployPhotonCollector() {
    // this.universeService.universe.energy -= 5;
    const newMachine = this.machineFactory.newMachine('PhotonCollector');
    if (newMachine.payFor(1)) {
      this.machineService.addMachine(newMachine);
      console.log("Deployed photon collector!");
    } else {
      console.log("Can't afford new photon collector!");
    }
  }
}
