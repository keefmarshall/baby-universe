import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../services/universe.service';

import { ParticleFactory } from '../../machines/particle-factory';
import { ResearchService } from 'app/services/research.service';
import { ConstructionService } from 'app/services/construction.service';
import { StateManagementService } from 'app/services/state-management.service';
import { AutosaveService } from 'app/services/autosave.service';
import { StargameService } from 'app/games/stargame/stargame.service';
import { LogService } from 'app/services/log.service';
import { QuarkUtils } from 'app/research/matter';

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
    public universeService: UniverseService,
    private researchService: ResearchService,
    private constructionService: ConstructionService,
    private stargameService: StargameService,
    private autosaveService: AutosaveService,
    private logService: LogService
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
      this.logService.resetLogs();
      window.location.reload();
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

  addQuarks(n: number) {
    const qu = new QuarkUtils();
    const u = this.universeService.universe;
    for (let i = 0; i < n; i++) {
      const quark = qu.randomQuark(u);
      this.particleFactory.collectQuark(u, quark);
    }
  }

  windowHeight(): number { return window.innerHeight; }
  windowWidth(): number { return window.innerWidth; }

}
