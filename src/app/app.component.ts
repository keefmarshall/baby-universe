import { Component, OnInit } from '@angular/core';
import { AutosaveService } from './services/autosave.service';
import { MachineService } from './services/machine.service';
import { TimeService } from './services/time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Baby Universe';

  constructor(
    private autosaveService: AutosaveService,
    private machineService: MachineService,
    private timeService: TimeService
  ) { }

  ngOnInit() {
    this.autosaveService.enabled = true;
  }
}
