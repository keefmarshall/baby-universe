import { Component, OnInit, OnDestroy } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { Thermometer } from '../../machines/thermometer';
import { TickerService } from '../../services/ticker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-temperature',
  template: `
    <span *ngIf="temperature >= 1e6 || temperature < 1e-3">
      {{ mantissa }}&nbsp;×&nbsp;10<sup>{{ exponent }}</sup>K
    </span>
    <span *ngIf="temperature < 1e5 && temperature >= 1e-3">
      {{ temperature.toPrecision(5) | number:"1.0-5" }}K
    </span>
  `
})
export class TemperatureComponent implements OnInit, OnDestroy {
  private tickerSub: Subscription;

  public temperature: number = 0;
  public mantissa: string = "0";
  public exponent: number = 0;

  constructor(
    private machineService: MachineService,
    private tickerService: TickerService
  ) { }

  ngOnInit() {
    this.tickerSub = this.tickerService.tick$.subscribe((n) => {
      if (n % 10 === 0) {
        this.setTemperature();
      }
    });
  }

  ngOnDestroy() {
    if (this.tickerSub) {
      this.tickerSub.unsubscribe();
    }
  }

  setTemperature() {
    const therm = this.machineService.getMachine('Thermometer') as Thermometer;
    this.temperature = (therm != null) ? therm.meterValue : 0;
    // Math.floor(Math.log(temp) / Math.log(10));
    this.exponent = (therm != null) ? therm.exponent : 0;
    this.mantissa = (this.temperature / Math.pow(10, this.exponent)).toPrecision(4)
  }
}
