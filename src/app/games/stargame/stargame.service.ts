import { Injectable } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import * as createjs from 'createjs-module';
import { Star, UpQuarkStar, DownQuarkStar, StrangeQuarkStar, CharmQuarkStar } from 'app/games/stargame/star';
import { ResearchProject } from 'app/research/research-project';
import { Quarks2, Quarks3 } from 'app/research/matter';
import { ParticleFactory } from 'app/machines/particle-factory';

@Injectable()
export class StargameService {
  private canvasName: string;
  private canvasHeight: number;
  private canvasWidth: number;

  private stage: createjs.Stage;
  private startr: number = 10;

  private particleFactory: ParticleFactory;

  constructor(
    private universeService: UniverseService 
  ) { 
    this.particleFactory = new ParticleFactory();
  }

  initGame(canvasName: string) {
    this.canvasName = canvasName;
    this.initStage();
  }

  initStage() {
    this.stage = new createjs.Stage(this.canvasName);

    this.canvasWidth = this.stage.canvas['width'];
    this.canvasHeight = this.stage.canvas['height'];
    console.log("Stage canvas width/height: " + this.canvasWidth + ", " + this.canvasHeight);

    // var startr = 10;
    this.startr = Math.round((this.canvasWidth + this.canvasHeight) / 80);
    console.log("Base radius is " + this.startr);

    // background
    const rect = new createjs.Shape();
    rect.graphics.beginFill("Black").drawRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.stage.addChild(rect);

    createjs.Ticker.setFPS(20);
    createjs.Ticker.addEventListener("tick", this.stage);
  }

  startGame() {
    this.doStar();
    createjs.Ticker.setPaused(false);
  }

  resumeGame() {
    createjs.Ticker.setPaused(false);
    this.stage.update();
  }

  pauseGame() {
    createjs.Ticker.setPaused(true);
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

    starContainer.addChild(starSprite);
    this.stage.addChild(starContainer);

    const difficulty = star.difficulty;
    const delay = 1000 + (3000 * difficulty);

    const starTween = createjs.Tween.get(starSprite)
        .to({alpha: 1, rotation: 720}, delay, createjs.Ease.getPowInOut(2))
        .wait(500 * difficulty)
        .to({alpha: 0, rotation: 0}, delay, createjs.Ease.getPowInOut(2));

    const contTween = createjs.Tween.get(starContainer)
        .to({x: this.randomX(), y: this.randomY()}, delay, createjs.Ease.getPowInOut(2))
        .wait(500 * difficulty)
        .to({x: this.randomX(), y: this.randomY()}, delay, createjs.Ease.getPowInOut(2));

    const timeline = new createjs.Timeline([starTween, contTween], null, null);
    contTween.call(this.starFinished, [star], this);

    // funky arrow syntax to retain context
    starSprite.addEventListener("click", (event) => this.starClicked(event));
  }

  randomStar(): Star {
    const ran = Math.random() * 100; // 0-99.9999
    console.log("Random star: ran = " + ran);
    // if (this.isResearched(new Quarks3())) {
      // include tiny change of top and bottom quarks      
    // } else 
    if (this.isResearched(new Quarks2())) {
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


  starFinished(star: Star) {
    console.log("Star finished, type = " + star.type + ", captured = " + star.captured);
    setTimeout(() => {
        this.doStar();
    }, (Math.random() * 3000) + 1000);
  }

  starClicked(event) {
    console.log("Clicked! " + JSON.stringify(event.type) + ", " + event.target);
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

}
