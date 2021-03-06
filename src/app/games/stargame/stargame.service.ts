import { Injectable } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import * as createjs from 'createjs-module';
import { Star, UpQuarkStar, DownQuarkStar, StrangeQuarkStar, CharmQuarkStar, TopQuarkStar, BottomQuarkStar } from 'app/games/stargame/star';
import { ResearchProject } from 'app/research/research-project';
import { Quarks2, Quarks3, QuarkUtils } from 'app/research/matter';
import { ParticleFactory } from 'app/machines/particle-factory';

@Injectable()
export class StargameService {
  private canvasName: string;
  private canvasHeight: number;
  private canvasWidth: number;

  private stage: createjs.Stage;
  private tickListener = null;
  private startr: number = 10;
  private readonly radiusDivisor: number = 70; // bigger -> smaller stars

  private activeTimeoutIds = [];

  private particleFactory: ParticleFactory;

  constructor(
    private universeService: UniverseService 
  ) { 
    this.particleFactory = new ParticleFactory();
  }

  initGame(canvasName: string) {
    this.canvasName = canvasName;
    console.log("Star Game Initialising, canvas name = " + canvasName + "..");
    this.initStage();
  }

  initStage() {
    console.log("Star Game: Stage Initialising..");
    this.stage = new createjs.Stage(this.canvasName);
    createjs.Touch.enable(this.stage); // hoping this will help

    this.canvasWidth = this.stage.canvas['width'];
    this.canvasHeight = this.stage.canvas['height'];
    console.log("Stage canvas width/height: " + this.canvasWidth + ", " + this.canvasHeight);

    // var startr = 10;
    this.startr = Math.round((this.canvasWidth + this.canvasHeight) / this.radiusDivisor);
    console.log("Base radius is " + this.startr);

    // background
    const rect = new createjs.Shape();
    rect.graphics.beginFill("Black").drawRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.stage.addChild(rect);

    this.startGame();

    createjs.Ticker.setFPS(20);
    createjs.Ticker.init();
    this.tickListener = createjs.Ticker.addEventListener("tick", this.stage);
  }

  startGame() {
    console.log("Star Game: Starting..");

    this.doStar();
    createjs.Ticker.setPaused(false);

    // add more stars if there are appropriate machines in play:
    const matterDetectors = this.machineQuantity("MatterDetector");
    console.log("Starting " + matterDetectors + " matter detectors..");
    for (let i = 0; i < matterDetectors; i++) {
      this.queueNewStar(Math.random() * 3000);
    }
  }

  stopGame() {
    // Stop existing stars
    createjs.Tween.removeAllTweens();

    // Stop any new stars
    this.activeTimeoutIds.forEach((tid) => {
      clearTimeout(tid);
    });

    // Shut down the ticker:
    createjs.Ticker.setPaused(true);
    if (this.tickListener) {
      createjs.Ticker.removeEventListener("tick", this.tickListener);
    }

    // clear the canvas stage
    if (this.stage) {
      this.stage.removeAllChildren();
      this.stage.removeAllEventListeners();
      this.stage.enableDOMEvents(false); // otherwise everything slows down to a crawl after a few stop/starts
      this.stage.update();
      createjs.Touch.disable(this.stage);
      // createjs.Ticker.reset(); // this can kill the canvas under some conditions
      // createjs.Ticker.removeAllEventListeners("tick"); // as can this
    }
  }

  resumeGame() {
    createjs.Ticker.setPaused(false);
    createjs.Touch.enable(this.stage);
    this.stage.update();
  }

  pauseGame() {
    createjs.Ticker.setPaused(true);
    createjs.Touch.disable(this.stage);
  }

  doStar() {
    const star = this.randomStar();

    // need a container, so we can rotate relative to it. 
    // We move the container round the screen but the star rotates relative to it.
    const starContainer = new createjs.Container();
    starContainer.x = this.randomX();
    starContainer.y = this.randomY();

    const radius = this.startr * star.radiusFactor;

    const starSprite = new createjs.Shape();
    starSprite.name = "mystar-" + Math.floor(Math.random() * 100);
    starSprite.graphics
        .beginRadialGradientFill(["White", star.colour], [0, 1], 0, 0, 0, 0, 0, radius)
        .drawPolyStar(0, 0, radius, star.points, star.pointiness, 0);
        starSprite.alpha = 0;
    starSprite.regX = 0;
    starSprite.regY = 0;
    starSprite["star"] = star; // custom property

    // We define a slightly larger hit area for the star - otherwise the game
    // is pretty much impossible on mobile.
    const starHit = new createjs.Shape();
    // starHit.graphics.beginFill("#000").drawCircle(0, 0, radius);
    starHit.graphics.beginFill("#000").drawRect(-radius, -radius, radius * 2, radius * 2);
    starSprite.hitArea = starHit;

    starContainer.addChild(starSprite);
    // starContainer.addChild(starHit); // assume we need to do this?
    this.stage.addChild(starContainer);

    const easiness = 0.25 / star.difficulty;
    const delay = 1000 + (3000 * easiness);

    // console.log("Easiness = " + easiness + ", delay = " + delay);

    const starTween = createjs.Tween.get(starSprite)
        .to({alpha: 1, rotation: 720}, delay, createjs.Ease.getPowInOut(2))
        .wait(500 * easiness)
        .to({alpha: 0, rotation: 0}, delay, createjs.Ease.getPowInOut(2));

    const contTween = createjs.Tween.get(starContainer)
        .to({x: this.randomX(), y: this.randomY()}, delay, createjs.Ease.getPowInOut(2))
        .wait(500 * easiness)
        .to({x: this.randomX(), y: this.randomY()}, delay, createjs.Ease.getPowInOut(2));

    const timeline = new createjs.Timeline([starTween, contTween], null, null);
    contTween.call(this.starFinished,
      [star, starSprite, starContainer],
      this);

    // funky arrow syntax to retain context
    starSprite.addEventListener("click", (event) => this.starClicked(event));
  }

  randomStar(): Star {
    const quarkType = new QuarkUtils().randomQuark(this.universeService.universe);
    switch (quarkType) {
      case 'up quark': return new UpQuarkStar();
      case 'down quark': return new DownQuarkStar();
      case 'strange quark': return new StrangeQuarkStar();
      case 'charm quark': return new CharmQuarkStar();
      case 'top quark': return new TopQuarkStar();
      case 'bottom quark': return new BottomQuarkStar();
      default: return new UpQuarkStar(); // shouldn't happen
    }
  }

  private isResearched(project: ResearchProject): boolean {
    const props = this.universeService.universe.research[project.name];
    return props != null ? props.researched : false;
  }


  starFinished(star: Star, starSprite: createjs.Shape, starContainer: createjs.Container) {
    // console.log("Star finished, type = " + star.type + ", captured = " + star.captured);
    createjs.Tween.removeTweens(starSprite);
    createjs.Tween.removeTweens(starContainer);

    starSprite.removeAllEventListeners('click');
    starContainer.removeAllEventListeners('click');
    starContainer.removeChild(starSprite);
    this.stage.removeChild(starContainer);

    this.queueNewStar((Math.random() * 3000) + 1000);
  }

  queueNewStar(delay: number) {
    const tid = setTimeout(() => {
      this.doStar();
      this.activeTimeoutIds.splice(this.activeTimeoutIds.indexOf(tid), 1);
    }, delay);
    this.activeTimeoutIds.push(tid);
  }

  starClicked(event) {
    // console.log("Clicked! " + JSON.stringify(event.type) + ", " + event.target);
    event.target.removeAllEventListeners('click');
    event.target.visible = false;
    event.target.star.captured = true;

    // console.log("Captured star x=" + event.target.parent.x + ", y=" + event.target.parent.y);

    const type = event.target.star.type;
    this.particleFactory.collectQuark(this.universeService.universe, type);

    const text = new createjs.Text(type, this.startr + "px Arial", event.target.star.colour);
    text.x = event.target.parent.x - 20;
    text.y = event.target.parent.y - 5;
    this.stage.addChild(text);

    const textTween = createjs.Tween.get(text)
      .to({alpha: 0.5}, 150)
      .to({alpha: 1}, 150)
      .to({alpha: 0.5}, 150)
      .to({alpha: 1}, 150)
      .to({alpha: 0}, 2000, createjs.Ease.getPowInOut(2))
      .call(this.textFinished, [text], this);
  }

  textFinished(text) {
    createjs.Tween.removeTweens(text);
    this.stage.removeChild(text);
  }

  randomX() {
    return (Math.random() * this.canvasWidth * 0.8) + (this.canvasWidth * 0.1);
  }

  randomY() {
      return (Math.random() * this.canvasHeight * 0.8) + (this.canvasHeight * 0.1);
  }

  protected machineQuantity(machineName: string): number {
    if (this.universeService.universe.machines[machineName] == null) {
        return 0;
    } else {
        return this.universeService.universe.machines[machineName].quantity;
    }
  }

}
