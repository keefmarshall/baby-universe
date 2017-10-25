import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { ParticleService } from '../../services/particle.service';
import { UniverseService } from '../../services/universe.service';

import { PhotonCollector } from '../../machines/photon-collector';

@Component({
  selector: 'app-dev-panel',
  templateUrl: './dev-panel.component.html',
  styleUrls: ['./dev-panel.component.css']
})
export class DevPanelComponent implements OnInit {

  constructor(
    private machineService: MachineService,
    private particleService: ParticleService,
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
    this.particleService.collectPhoton();
  }

  deployPhotonCollector() {
    console.log('Deployed photon collector!');
    this.universeService.universe.energy -= 5;
    this.machineService.addMachine(new PhotonCollector());
  }
}
