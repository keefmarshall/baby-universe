import { Component, OnInit, isDevMode, ViewChild, AfterViewInit, Renderer2, ElementRef, RendererFactory2 } from '@angular/core';
import { AutosaveService } from './services/autosave.service';
import { TimeService } from './services/time.service';
import { UniverseService } from 'app/services/universe.service';
import { StateManagementService } from 'app/services/state-management.service';
import { TickerService } from 'app/services/ticker.service';
import { MatDialog } from '@angular/material';
import { HelpPanelComponent } from 'app/panels/help-panel/help-panel.component';
import { Globals } from 'app/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('header') headerRef: ElementRef;
  @ViewChild('footer') footerRef: ElementRef;

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

  private fadeElements() {
    this.addClass(this.headerRef.nativeElement, "fadeOut");
    this.addClass(this.footerRef.nativeElement, "fadeOut");
  }

  private showElements() {
    this.removeClass(this.headerRef.nativeElement, "fadeOut");
    this.removeClass(this.footerRef.nativeElement, "fadeOut");
    this.addClass(this.headerRef.nativeElement, "fadeInLeft");
    this.addClass(this.footerRef.nativeElement, "fadeInLeft");
  }

  // For some reason I'm getting errors about these elements, unclear
  // why at the moment..
  private addClass(ref: ElementRef, cl: string) {
    if (ref && ref.nativeElement) {
      this.renderer.addClass(ref.nativeElement, cl);
    }
  }

  private removeClass(ref: ElementRef, cl: string) {
    if (ref && ref.nativeElement) {
      this.renderer.removeClass(ref.nativeElement, cl);
    }
  }

}
