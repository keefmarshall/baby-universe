import { Component, OnInit } from '@angular/core';
import { Thermometer } from 'app/machines/thermometer';
import { MachineService } from 'app/services/machine.service';
import { HeatingService } from 'app/services/heating.service';

@Component({
  selector: 'app-temperature-panel',
  templateUrl: './temperature-panel.component.html',
  styleUrls: ['./temperature-panel.component.css']
})
export class TemperaturePanelComponent implements OnInit {
  constructor(
    private machineService: MachineService,
    private heatingService: HeatingService
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

  onSwitchChange($event) {
    this.heatingService.setHeating($event.source.checked);
  }

  isHeating(): boolean {
    return this.heatingService.isHeating();
  }

  heaterExists(): boolean {
    return this.machineService.exists("SpaceHeater");
  }
}
