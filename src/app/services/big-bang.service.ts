import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { StargameService } from 'app/games/stargame/stargame.service';
import { TickerService } from 'app/services/ticker.service';
import { UniverseService } from 'app/services/universe.service';

@Injectable()
export class BigBangService {
  private elementRef: ElementRef;
  private renderer: Renderer2;

  constructor(
    private rendererFactory2: RendererFactory2,
    private stargameService: StargameService,
    private tickerService: TickerService,
    private universeService: UniverseService
  ) {
    this.universeService.phase$.subscribe(phase => {
      if (phase === 2) {
        // we're up
        console.log("Phase change detected: BIG BANG!!!");
        this.bigBang();
      }
    });

    this.renderer = rendererFactory2.createRenderer(null, null);
  }

  setElementRef(er: ElementRef) {
    this.elementRef = er;
  }

  bigBang() {
    this.renderer.addClass(this.elementRef.nativeElement, "bigbang");
    this.renderer.addClass(this.renderer.parentNode(this.elementRef.nativeElement), "black");
    setTimeout(() => {
      console.log("BB animation done, pausing the universe");
      this.pauseUniverse();
    }, 7500);
  }

  noBigBang() {
    this.renderer.removeClass(this.elementRef.nativeElement, "bigbang");
    this.renderer.removeClass(this.renderer.parentNode(this.elementRef.nativeElement), "black");
    this.resumeUniverse();
  }

  pauseUniverse() {
    this.tickerService.pause();
    this.stargameService.pauseGame();
  }

  resumeUniverse() {
    this.tickerService.resume();
    this.stargameService.resumeGame();
  }

}