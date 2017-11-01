import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { UniverseService } from '../../services/universe.service';

import { ParticleFactory } from '../../machines/particle-factory';
import { ResearchList } from 'app/research/research-list';
import { ResearchService } from 'app/services/research.service';

@Component({
  selector: 'app-dev-panel',
  templateUrl: './dev-panel.component.html',
  styleUrls: ['./dev-panel.component.css']
})
export class DevPanelComponent implements OnInit {
  private particleFactory = new ParticleFactory();
  private projects = ResearchList.projects;

  constructor(
    private machineService: MachineService,
    private universeService: UniverseService,
    private researchService: ResearchService
  ) { }

  ngOnInit() {
  }

  resetUniverse() {
    const confirm = window.confirm('Reset everything??');
    if (confirm) {
      this.universeService.resetUniverse();
      this.machineService.resetMachines();
      this.researchService.initialise(this.universeService.universe);
    }
  }

  collectPhoton() {
    console.log('Collected photon!');
    this.particleFactory.collectPhoton(this.universeService.universe);
  }

  addEnergy(n: number) {
    this.universeService.universe.energy += n;
  }
}
