import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AutosaveService } from '../../services/autosave.service';
import { BigBangService } from '../../services/big-bang.service';
import { MachineService } from '../../services/machine.service';
import { UniverseService } from '../../services/universe.service';
import { Quarks1 } from '../../research/matter';

@Component({
  selector: 'app-phase-one',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.css']
})
export class PhaseOneComponent implements OnInit, AfterViewInit {
  @ViewChild('bigbang') mainDivRef: ElementRef;
  @ViewChild('finalscore') fsDivRef: ElementRef;

  constructor(
    private bigBangService: BigBangService,
    private machineService: MachineService,
    private universeService: UniverseService
  ) { }

  ngOnInit() {
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


}
