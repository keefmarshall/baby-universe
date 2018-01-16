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
import { BigBangService } from 'app/services/big-bang.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit  {
  title = 'Baby Universe';
  showDebug = isDevMode();

  @ViewChild('bigbang') mainDivRef: ElementRef;
  @ViewChild('finalscore') fsDivRef: ElementRef;

  // Add services here to ensure they're started at application
  // load time, otherwise things may not get kicked off correctly.
  constructor(
    private autosaveService: AutosaveService,
    private bigBangService: BigBangService,
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

  ngAfterViewInit() {
    this.bigBangService.setElementRef(this.mainDivRef);
    this.bigBangService.setFinalScoreElementRef(this.fsDivRef);
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
    this.bigBangService.bigBang();
  }

  noBigBang() {
    this.bigBangService.noBigBang();
  }

  pauseUniverse() {
    this.bigBangService.pauseUniverse();
  }

  resumeUniverse() {
    this.bigBangService.resumeUniverse();
  }

  resetUniverse() {
    const confirm = window.confirm('This will erase all progress, are you sure?');
    if (confirm) {
      this.universeService.resetUniverse();
      this.autosaveService.autosave();
      window.location.reload();
    }
  }

}
