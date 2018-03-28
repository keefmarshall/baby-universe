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
import { MachineService } from '../../services/machine.service';
import { MachineFactory } from '../../machines/machine-factory';
import { ConstructionProject } from '../../machines/construction-project';
import { ContrivanceService } from '../../services/contrivance.service';

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
    private contrivanceService: ContrivanceService,
    private machineFactory: MachineFactory,
    private machineService: MachineService,
    public stargameService: StargameService,
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

  addThermometer() {
    if (!this.machineService.exists("Thermometer")) {
      const th = this.machineFactory.newMachine("Thermometer") as ConstructionProject;
      th.setMachineService(this.machineService);
      th.onComplete();
    }
  }

  resetContrivanceState() {
    const u = this.universeService.universe;
    u.contrivances = null;
    u.currentConstructionWork = 0;
    u.currentConstructionProject = null;
    u.currentResearchProject = null;
    this.contrivanceService.initialiseFromUniverse(u);
    delete u.machines['Contraption'];
    delete u.machines['RudimentaryResearcher'];
    delete u.research['Matter: Leptons'];
    delete u.research['Matter: Mesons'];
    delete u.research['Matter: Hadrons'];
    delete u.research["Matter: Pions π+/π-"];
    delete u.research["Matter: Kaons K+/K-"];
    this.stateManagementService.resetMachines();
  }

  switchPhase(p: number) {
    this.universeService.transitionToPhase(p);
  }

  windowHeight(): number { return window.innerHeight; }
  windowWidth(): number { return window.innerWidth; }

}
