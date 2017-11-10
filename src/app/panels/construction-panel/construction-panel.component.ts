import { Component, OnInit } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { ConstructionService } from 'app/services/construction.service';
import { MeteringService } from 'app/services/metering.service';
import { ConstructionEnergyCostMeter } from 'app/meters/construction-energy-cost-meter';
import { MachineFactory } from 'app/machines/machine-factory';
import { Assembler } from 'app/machines/assembler';


@Component({
  selector: 'app-construction-panel',
  templateUrl: './construction-panel.component.html',
  styleUrls: ['./construction-panel.component.css']
})
export class ConstructionPanelComponent implements OnInit {
  constructor(
    private universeService: UniverseService,
    private constructionService: ConstructionService,
    private machineFactory: MachineFactory,
    private meteringService: MeteringService
  ) { }

  ngOnInit() {
  }

  readEnergyCostMeter(): number {
    return this.meteringService.read('construction-energy-cost');
  }

  readAssemblerEfficiency(): number {
    return this.universeService.universe.machines[Assembler.name].efficiency;
  }

  energyCostColour(): string {
    if (!this.constructionService.isConstructing()) {
      return 'green';
    }

    const usage = this.readEnergyCostMeter();
    const supply = this.meteringService.read('energy');
    const totalEnergy = this.universeService.universe.energy;
    if (supply <= 0) {
      if (totalEnergy < usage * 10) {
        return 'red';
      } else {
        return 'orange';
      }
    } else {
      return 'green';
    }

  }
}
