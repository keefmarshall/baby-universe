import { Component, OnInit } from '@angular/core';
import { Thermometer } from 'app/machines/thermometer';
import { MachineService } from 'app/services/machine.service';
import { HeatingService } from 'app/services/heating.service';
import { MeteringService } from 'app/services/metering.service';
import { UniverseService } from 'app/services/universe.service';

@Component({
  selector: 'app-temperature-panel',
  templateUrl: './temperature-panel.component.html',
  styleUrls: ['./temperature-panel.component.css']
})
export class TemperaturePanelComponent implements OnInit {
  constructor(
    private machineService: MachineService,
    private heatingService: HeatingService,
    private meteringService: MeteringService,
    private universeService: UniverseService
  ) { }

  ngOnInit() {
  }

  temperature(): number {
    const therm = this.machineService.getMachine('Thermometer') as Thermometer;
    return (therm != null) ? therm.meterValue : 0;
  }

  exponent(): number {
    return Math.floor(Math.log(this.temperature()) / Math.log(10));
  }

  mantissa(): string {
    return (this.temperature() / Math.pow(10, this.exponent())).toPrecision(4);
  }

  phase1Progress(): number {
    const therm = this.machineService.getMachine('Thermometer') as Thermometer;
    return therm.phase1Progress;
  }

  onSwitchChange($event) {
    this.heatingService.setHeating($event.source.checked);
  }

  isHeating(): boolean {
    return this.heatingService.isHeating();
  }

  heaterExists(): boolean {
    return this.machineService.exists("SpaceHeater");
  }

  // TODO: these two copy-pasted from construction panel - need some
  // better re-use. Too much duplicated code between Assmbler/construction
  // and Heater / temperature
  
  readEnergyCostMeter(): number {
    return this.meteringService.read('heater-energy-cost');
  }

  energyCostColour(): string {
    if (!this.isHeating()) {
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
