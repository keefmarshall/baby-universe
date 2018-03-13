import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { StargameService } from 'app/games/stargame/stargame.service';
import { TickerService } from 'app/services/ticker.service';
import { UniverseService } from 'app/services/universe.service';
import { AnalyticsService } from 'app/services/analytics.service';
import { PlasmaShockService } from './plasma-shock.service';

@Injectable()
export class BigBangService {
  private elementRef: ElementRef;
  private finalScoreElementRef: ElementRef;
  private renderer: Renderer2;

  constructor(
    private plasmaShockService: PlasmaShockService,
    private rendererFactory2: RendererFactory2,
    private stargameService: StargameService,
    private tickerService: TickerService,
    private universeService: UniverseService,
    private analytics: AnalyticsService
  ) {
    this.universeService.phase$.subscribe(phase => {
      if (phase === 1.5) {
        // we're up
        console.log("Phase change detected: BIG BANG!!!");
        this.bigBang();
        this.analytics.endPhase1(this.universeService.universe,
            this.universeService.finalScorePhase1());
      }
    });

    this.renderer = rendererFactory2.createRenderer(null, null);
  }

  setElementRef(er: ElementRef) {
    this.elementRef = er;
  }

  setFinalScoreElementRef(fser: ElementRef) {
    this.finalScoreElementRef = fser;
  }

  bigBang() {
    console.log("Big bang, pausing universe, starting animation");
    this.pauseUniverse();
    this.renderer.addClass(this.elementRef.nativeElement, "bigbang");
    const mainWrapper = this.parentOf(this.parentOf(this.elementRef.nativeElement));
    // TODO: fade out header, somehow
    this.renderer.addClass(mainWrapper, "black");
    setTimeout(() => {
      console.log("BB animation done, showing final score");
      // this.renderer.setStyle(this.finalScoreElementRef.nativeElement, "display", "block");
      this.renderer.removeClass(mainWrapper, "black");
    }, 7500);
  }

  noBigBang() {
    this.renderer.removeClass(this.elementRef.nativeElement, "bigbang");
    this.renderer.removeClass(this.renderer.parentNode(this.elementRef.nativeElement), "black");
    this.resumeUniverse();
  }

  pauseUniverse() {
    this.tickerService.pause();
    this.tickerService.gameEnd(); // set state so it doesn't get unpaused.
    this.stargameService.pauseGame();
    this.plasmaShockService.stop();
  }

  resumeUniverse() {
    this.tickerService.resume();
    this.stargameService.resumeGame();
  }

  private parentOf(elementRef: ElementRef): ElementRef {
    return this.renderer.parentNode(elementRef);
  }

}
