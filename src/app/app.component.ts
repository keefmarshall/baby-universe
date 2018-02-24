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
import { MatDialog } from '@angular/material';
import { HelpPanelComponent } from 'app/panels/help-panel/help-panel.component';
import { Globals } from 'app/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Baby Universe';
  showDebug = isDevMode();

  globals = Globals; // export for template

  // Add services here to ensure they're started at application
  // load time, otherwise things may not get kicked off correctly.
  constructor(
    private autosaveService: AutosaveService,
    private machineService: MachineService,
    private stateManagementService: StateManagementService,
    private tickerService: TickerService,
    private timeService: TimeService,
    private universeService: UniverseService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.autosaveService.enabled = true;
  }

  resetUniverse() {
    const confirm = window.confirm('This will erase all progress, are you sure?');
    if (confirm) {
      this.universeService.resetUniverse();
      this.autosaveService.autosave();
      window.location.reload();
    }
  }

  openHelp() {
    this.dialog.open(HelpPanelComponent);
  }
}
