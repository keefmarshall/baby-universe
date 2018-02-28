import { Component, OnInit, isDevMode, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { AutosaveService } from './services/autosave.service';
import { TimeService } from './services/time.service';
import { UniverseService } from 'app/services/universe.service';
import { StateManagementService } from 'app/services/state-management.service';
import { TickerService } from 'app/services/ticker.service';
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

  phaseToShow: number = 0.5;

  // Add services here to ensure they're started at application
  // load time, otherwise things may not get kicked off correctly.
  constructor(
    private autosaveService: AutosaveService,
    private stateManagementService: StateManagementService,
    private tickerService: TickerService,
    private timeService: TimeService,
    public universeService: UniverseService
  ) { }

  ngOnInit() {
    this.autosaveService.enabled = true;
    this.setPhaseToShow();
  }

  setPhaseToShow() {
    this.phaseToShow = this.universeService.universe.phase;
    this.universeService.phase$.subscribe((phase) => {
      switch (phase) {
        case 1.5: // delay for big bang animation
          setTimeout(() => {this.phaseToShow = 1.5; }, 7500);
          break;

        default:
          this.phaseToShow = phase;
      }
    });
  }

}
