import { Component, OnInit } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { ConstructionService } from 'app/services/construction.service';
import { MeteringService } from 'app/services/metering.service';
import { ConstructionEnergyCostMeter } from 'app/meters/construction-energy-cost-meter';
import { MachineFactory } from 'app/machines/machine-factory';
import { Assembler } from 'app/machines/assembler';
import { Globals } from 'app/globals';
import { AssemblyPlant } from 'app/machines/assembly-plant';
import { MachineService } from '../../services/machine.service';
import { ThermalSpanner } from '../../machines/thermal-spanner';


@Component({
  selector: 'app-construction-panel',
  templateUrl: './construction-panel.component.html',
  styleUrls: ['./construction-panel.component.css']
})
export class ConstructionPanelComponent implements OnInit {
  constructor(
    public universeService: UniverseService,
    public constructionService: ConstructionService,
    private machineFactory: MachineFactory,
    private machineService: MachineService,
    private meteringService: MeteringService
  ) { }

  ngOnInit() {
  }

  readEnergyCostMeter(): number {
    return this.meteringService.read('construction-energy-cost');
  }

  readAssemblerEfficiency(): number {
    return Globals.round(this.universeService.universe.machines['Assembler'].efficiency, 1);
  }

  readWorkMeter(): number {
      return this.meteringService.read('work');
  }

  idlePhilosopherBoost(): number {
    const ap = this.machineFactory.newMachine("AssemblyPlant") as AssemblyPlant;
    return ap ? ap.idlePhilosopherBoost() : 1;
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

  sabotage() {
    const spanner = this.machineService.getMachine("ThermalSpanner") as ThermalSpanner;
    spanner.trigger();
    this.universeService.universe.machines["ThermalSpanner"].quantity --;
  }
}
