import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-stargame',
  templateUrl: './stargame.component.html',
  styleUrls: ['./stargame.component.css']
})
export class StargameComponent implements AfterViewInit {
  @Input() width = 248;
  @Input() height = 300;

  // NB if injecting MatDialogRef this component can only be used
  // as a dialog! Might be better off wrapping the game in an
  // outer component that holds the Dialog stuff, otherwise we
  // lose the option of embedding it into the main page.
  constructor() { }

  ngAfterViewInit() {
    const stage = new createjs.Stage("stargame-canvas");
    const circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 10;
    circle.y = 10;
    stage.addChild(circle);

    stage.update();

    createjs.Tween.get(circle, { loop: true })
      .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
      .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
      .to({ alpha: 0, y: 225 }, 100)
      .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
      .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));

    createjs.Ticker.setFPS(20);
    createjs.Ticker.addEventListener("tick", stage);
  }

}
