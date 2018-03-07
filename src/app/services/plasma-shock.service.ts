import { Injectable, ElementRef, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable()
export class PlasmaShockService {
  private elementRef: ElementRef;
  private renderer: Renderer2;

  private isStarted = false;
  private paused = false;
  private timeoutId;
  private readonly baseInterval = 10000;

  public shockLevel: number = 0;

  constructor(
    private rendererFactory2: RendererFactory2,
  ) {
    this.renderer = rendererFactory2.createRenderer(null, null);
    document.addEventListener("visibilitychange", (event) => {
      this.handleVisibilityChangeEvent(event);
    });
  }

  setElementRef(er: ElementRef) {
    this.elementRef = er;
  }

  start() {
    if (!this.isStarted) {
      console.log("Plasma shock starting..");
      this.isStarted = true;
      if (!this.paused) {
        this.queueShock();
      }
    }
  }

  stop() {
    this.isStarted = false;
    if (this.timeoutId) {
      console.log("Plasma shock stopping..");
      clearTimeout(this.timeoutId);
    }
  }

  queueShock() {
    const randomFactor = (5 - this.shockLevel) * Math.random()
    const delay =
      (this.baseInterval * randomFactor)
      + (this.baseInterval / (this.shockLevel + 1));

    if (this.shockLevel > 0) {
      this.timeoutId = setTimeout(() => this.doShock(), delay);
    } else { // shouldn't happen, this is belt-and-braces
      this.timeoutId = setTimeout(() => this.queueShock(), 60000);
    }
  }

  doShock() {
    const shockType = this.randomShockType();
    console.log(`doShock() level ${this.shockLevel} - ${shockType}`);
    this.renderer.addClass(this.elementRef.nativeElement, shockType);
    setTimeout(() => this.clearShock(shockType), 500);
  }

  clearShock(shockType: string) {
    console.log("clearShock()");
    this.renderer.removeClass(this.elementRef.nativeElement, shockType);
    if (this.isStarted && !this.paused) {
      this.queueShock();
    }
  }

  randomShockType(): string {
    const rand = Math.floor(Math.random() * this.shockLevel);
    let shockType = "plasma-shock";
    switch (rand) {
      case 1: shockType = "double-shock"; break;
      case 2: shockType = "fade-shock"; break;
      case 3: shockType = Math.random() < 0.5 ? "skew-shock" : "flicker-shock"; break;
      default: shockType = "plasma-shock";
    }
    return shockType;
  }

  handleVisibilityChangeEvent(event) {
    if (this.isStarted) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      if (document.hidden) {
        console.log("Pausing plasma shock..")
        this.paused = true;
      } else {
        console.log("Resuming plasma shock..")
        this.paused = false;
        this.queueShock();
      }
    }
  }
}
