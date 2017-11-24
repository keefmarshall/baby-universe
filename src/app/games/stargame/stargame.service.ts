import { Injectable } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import * as createjs from 'createjs-module';
import { Star, UpQuarkStar, DownQuarkStar, StrangeQuarkStar, CharmQuarkStar, TopQuarkStar, BottomQuarkStar } from 'app/games/stargame/star';
import { ResearchProject } from 'app/research/research-project';
import { Quarks2, Quarks3 } from 'app/research/matter';
import { ParticleFactory } from 'app/machines/particle-factory';
import { MatterDetector } from 'app/machines/matter-detector';

@Injectable()
export class StargameService {
  private canvasName: string;
  private canvasHeight: number;
  private canvasWidth: number;

  private stage: createjs.Stage;
  private startr: number = 10;
  private readonly radiusDivisor: number = 70; // bigger -> smaller stars

  private particleFactory: ParticleFactory;

  constructor(
    private universeService: UniverseService 
  ) { 
    this.particleFactory = new ParticleFactory();
  }

  initGame(canvasName: string) {
    console.log("Star Game Initialising..");
    this.canvasName = canvasName;
    this.initStage();
  }

  initStage() {
    console.log("Star Game: Stage Initialising..");
    this.stage = new createjs.Stage(this.canvasName);
    // createjs.Touch.enable(this.stage); // hoping this will help

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
    createjs.Ticker.addEventListener("tick", this.stage);
  }

  startGame() {
    console.log("Star Game: Starting..");

    this.doStar();
    createjs.Ticker.setPaused(false);

    // add more stars if there are appropriate machines in play:
    const matterDetectors = this.machineQuantity(MatterDetector.name);
    for (let i = 0; i < matterDetectors; i++) {
      setTimeout(() => this.doStar(), Math.random() * 3000);
    }
  }

  stopGame() {
    if (this.stage) {
      this.stage.removeAllChildren();
      this.stage.removeAllEventListeners();
      // createjs.Touch.disable(this.stage);
      createjs.Ticker.reset();
    }
  }

  resumeGame() {
    createjs.Ticker.setPaused(false);
    // createjs.Touch.enable(this.stage);
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
    const ran = Math.random() * 100; // 0-99.9999
    // console.log("Random star: ran = " + ran);
    if (this.isResearched(new Quarks3())) {
      // include tiny change of top and bottom quarks
      return ran < 60.5 ? new UpQuarkStar() :
              ran < 91 ? new DownQuarkStar() :
                ran < 95 ? new StrangeQuarkStar() :
                  ran < 98.7 ? new CharmQuarkStar() :
                    ran < 99.4 ? new TopQuarkStar() : new BottomQuarkStar();
    } else if (this.isResearched(new Quarks2())) {
      return ran < 61 ? new UpQuarkStar() :
              ran < 92 ? new DownQuarkStar() :
                ran < 96 ? new StrangeQuarkStar() : new CharmQuarkStar();
    } else { // assume Quarks1 has to be researched before we get here
      return ran < 65 ? new UpQuarkStar() : new DownQuarkStar();
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

    setTimeout(() => {
        this.doStar();
    }, (Math.random() * 3000) + 1000);
  }

  starClicked(event) {
    // console.log("Clicked! " + JSON.stringify(event.type) + ", " + event.target);
    event.target.removeAllEventListeners('click');
    event.target.visible = false;
    event.target.star.captured = true;
    const type = event.target.star.type;
    this.particleFactory.collectQuark(this.universeService.universe, type);
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
