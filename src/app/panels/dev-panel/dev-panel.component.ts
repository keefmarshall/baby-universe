import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { UniverseService } from '../../services/universe.service';

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
    console.log('Deployed photon collector!');
    this.universeService.universe.energy -= 5;
    this.machineService.addMachine(new PhotonCollector());
  }
}
