import { Component, OnInit, isDevMode, ViewChild, AfterViewInit, Renderer2, ElementRef, RendererFactory2 } from '@angular/core';
import { AutosaveService } from './services/autosave.service';
import { TimeService } from './services/time.service';
import { UniverseService } from 'app/services/universe.service';
import { StateManagementService } from 'app/services/state-management.service';
import { TickerService } from 'app/services/ticker.service';
import { MatDialog } from '@angular/material';
import { HelpPanelComponent } from 'app/panels/help-panel/help-panel.component';
import { Globals } from 'app/globals';
import { trigger } from '@angular/animations';
import { Animations } from './util/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('headerTrigger', Animations.fadePresentTrigger()),
    trigger('footerTrigger', Animations.fadePresentTrigger())
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  headerState = "present";
  footerState = "present";

  title = 'Baby Universe';
  showDebug = isDevMode();

  globals = Globals; // export for template

  phaseToShow: number = 0.5;

  private renderer: Renderer2;

  // Add services here to ensure they're started at application
  // load time, otherwise things may not get kicked off correctly.
  constructor(
    private autosaveService: AutosaveService,
    private rendererFactory2: RendererFactory2,
    private stateManagementService: StateManagementService,
    private tickerService: TickerService,
    private timeService: TimeService,
    public universeService: UniverseService
  ) {
    this.renderer = rendererFactory2.createRenderer(null, null);
  }

  ngOnInit() {
    this.autosaveService.enabled = true;
  }

  ngAfterViewInit() {
    this.setPhaseToShow();
  }

  setPhaseToShow() {
    this.phaseToShow = this.universeService.universe.phase;
    this.universeService.phase$.subscribe((phase) => {
      switch (phase) {
        case 1:
          this.showElements();
          break;

        case 1.5: // delay for big bang animation
          setTimeout(() => {this.phaseToShow = 1.5; }, 7500);
          this.fadeElements();
          break;

        case 2: // fade header back in
          this.showElements();
          this.phaseToShow = 2;
          break;

        default:
          this.phaseToShow = phase;
      }
    });
  }

  // These work, they just don't look very good, so disabled for now
  // until I figure out a better look.
  private fadeElements() {
    // this.headerState = "faded";
    // this.footerState = "faded";
  }

  private showElements() {
    // this.headerState = "present";
    // this.headerState = "present";
  }

}
