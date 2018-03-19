import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { StargameService } from 'app/games/stargame/stargame.service';
import { TickerService } from 'app/services/ticker.service';
import { UniverseService } from 'app/services/universe.service';
import { AnalyticsService } from 'app/services/analytics.service';
import { PlasmaShockService } from './plasma-shock.service';
import { MachineService } from './machine.service';
import { StateManagementService } from './state-management.service';
import { ResearchList } from '../research/research-list';
import { ResearchProject } from '../research/research-project';

@Injectable()
export class BigBangService {
  private elementRef: ElementRef;
  private finalScoreElementRef: ElementRef;
  private renderer: Renderer2;
  private researchList = new ResearchList();

  constructor(
    private plasmaShockService: PlasmaShockService,
    private rendererFactory2: RendererFactory2,
    private stargameService: StargameService,
    private tickerService: TickerService,
    private universeService: UniverseService,
    private analytics: AnalyticsService,
    private stateManagementService: StateManagementService
  ) {
    this.universeService.phase$.subscribe(phase => {
      if (phase === 1.5) {
        // we're up
        console.log("Phase change detected: BIG BANG!!!");
        this.bigBang();
        this.analytics.endPhase1(this.universeService.universe,
            this.universeService.finalScorePhase1());
      }
    });

    this.renderer = rendererFactory2.createRenderer(null, null);
  }

  setElementRef(er: ElementRef) {
    this.elementRef = er;
  }

  setFinalScoreElementRef(fser: ElementRef) {
    this.finalScoreElementRef = fser;
  }

  bigBang() {
    console.log("Big bang, pausing universe, starting animation");
    this.pauseUniverse();
    this.renderer.addClass(this.elementRef.nativeElement, "bigbang");
    const mainWrapper = this.parentOf(this.parentOf(this.elementRef.nativeElement));
    // Header is faded out in app.component
    this.renderer.addClass(mainWrapper, "black");
    setTimeout(() => {
      console.log("BB animation done. Clearing machines and research..");
      this.clearResearch();
      this.clearMachines();
      // this.renderer.setStyle(this.finalScoreElementRef.nativeElement, "display", "block");
      setTimeout(() => {
        this.renderer.removeClass(mainWrapper, "black");
      }, 4000);
    }, 7500);
  }

  clearMachines() {
    const u = this.universeService.universe;
    Object.keys(u.machines).forEach(machine => {
      if (machine !== "Supervisor") {
        delete u.machines[machine];
      }
    });
    u.currentConstructionProject = null;
    u.currentConstructionWork = 0;
    this.stateManagementService.resetConstruction();
    this.stateManagementService.resetMachines();
  }

  clearResearch() {
    const u = this.universeService.universe;
    u.currentResearchProject = null;
    Object.keys(u.research).forEach(projectName => {
      const project = this.researchList.projects[projectName];
      if (!project.correctPhase(u)) {
        delete u.research[projectName];
      }
    });
  }

  noBigBang() {
    this.renderer.removeClass(this.elementRef.nativeElement, "bigbang");
    this.renderer.removeClass(this.renderer.parentNode(this.elementRef.nativeElement), "black");
    this.resumeUniverse();
  }

  pauseUniverse() {
    this.tickerService.pause();
    this.tickerService.gameEnd(); // set state so it doesn't get unpaused.
    this.stargameService.pauseGame();
    this.plasmaShockService.stop();
  }

  resumeUniverse() {
    this.tickerService.resume();
    this.stargameService.resumeGame();
  }

  private parentOf(elementRef: ElementRef): ElementRef {
    return this.renderer.parentNode(elementRef);
  }

}
