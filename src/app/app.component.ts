import { Component, OnInit, isDevMode, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { AutosaveService } from './services/autosave.service';
import { MachineService } from './services/machine.service';
import { TimeService } from './services/time.service';
import { PhotonicPhilosopher } from 'app/machines/photonic-philosopher';
import { Assembler } from 'app/machines/assembler';
import { UniverseService } from 'app/services/universe.service';
import { StateManagementService } from 'app/services/state-management.service';
import { Quarks1 } from 'app/research/matter';
import { TickerService } from 'app/services/ticker.service';
import { StargameService } from 'app/games/stargame/stargame.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Baby Universe';
  showDebug = isDevMode();

  @ViewChild('bigbang') mainDivRef: ElementRef;

  // Add services here to ensure they're started at application
  // load time, otherwise things may not get kicked off correctly.
  constructor(
    private autosaveService: AutosaveService,
    private machineService: MachineService,
    private stateManagementService: StateManagementService,
    private tickerService: TickerService,
    private timeService: TimeService,
    private universeService: UniverseService,
    private renderer: Renderer2,
    private stargameService: StargameService
  ) { }

  ngOnInit() {
    this.autosaveService.enabled = true;
  }

  showDeploymentPanel(): boolean {
    return this.universeService.universe.photonCount >= 10;
  }

  showResearchPanel(): boolean {
    const rp =  this.machineService.exists('PhotonicPhilosopher');
    // console.log("Show research panel: " + rp);
    return rp;
  }

  showConstructionPanel(): boolean {
    const cp = this.machineService.exists('Assembler');
    // console.log("Show constrruction panel :" + cp);
    return cp;
  }

  showTemperaturePanel(): boolean {
    return this.machineService.exists('Thermometer');
  }

  showMatterCollectionPanel(): boolean {
    const props = this.universeService.universe.research[new Quarks1().name];
    return props != null ? props.researched : false;
  }

  bigBang() {
    this.renderer.addClass(this.mainDivRef.nativeElement, "bigbang");
    this.renderer.addClass(this.renderer.parentNode(this.mainDivRef.nativeElement), "black");
    setTimeout(() => {
      console.log("BB animation done, pausing the universe");
      this.pauseUniverse();
    }, 7500);
  }

  noBigBang() {
    this.renderer.removeClass(this.mainDivRef.nativeElement, "bigbang");
    this.renderer.removeClass(this.renderer.parentNode(this.mainDivRef.nativeElement), "black");
    this.resumeUniverse();
  }

  pauseUniverse() {
    this.tickerService.pause();
    this.stargameService.pauseGame();
  }

  resumeUniverse() {
    this.tickerService.resume();
    this.stargameService.resumeGame();
  }

}
