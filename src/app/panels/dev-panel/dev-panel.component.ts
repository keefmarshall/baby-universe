import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../services/universe.service';

import { ParticleFactory } from '../../machines/particle-factory';
import { ResearchService } from 'app/services/research.service';
import { ConstructionService } from 'app/services/construction.service';
import { StateManagementService } from 'app/services/state-management.service';
import { AutosaveService } from 'app/services/autosave.service';
import { StargameService } from 'app/games/stargame/stargame.service';

@Component({
  selector: 'app-dev-panel',
  templateUrl: './dev-panel.component.html',
  styleUrls: ['./dev-panel.component.css']
})
export class DevPanelComponent implements OnInit {
  private particleFactory = new ParticleFactory();
  private projects = null;

  constructor(
    private stateManagementService: StateManagementService,
    private universeService: UniverseService,
    private researchService: ResearchService,
    private constructionService: ConstructionService,
    private stargameService: StargameService,
    private autosaveService: AutosaveService
  ) { }

  ngOnInit() {
    this.projects = this.researchService.researchList.projects;
  }

  resetUniverse() {
    const confirm = window.confirm('Reset everything??');
    if (confirm) {
      this.universeService.resetUniverse();
      this.stateManagementService.reloadUniverse();
      this.researchService.initialise();
      this.constructionService.currentProject = null;
      this.autosaveService.autosave();
      this.stargameService.stopGame();
    }
  }

  saveNow() {
    this.autosaveService.autosave();
  }

  // collectPhoton() {
  //   console.log('Collected photon!');
  //   this.particleFactory.collectPhoton(this.universeService.universe);
  // }

  addEnergy(n: number) {
    this.universeService.universe.energy += n;
  }

  addScience(n: number) {
    this.researchService.addScience(n);
  }

  addWork(n: number) {
    this.constructionService.addWork(n);
  }

}
