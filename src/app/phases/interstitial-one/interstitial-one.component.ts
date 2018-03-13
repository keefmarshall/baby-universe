import { Component, OnInit } from '@angular/core';
import { NumberFormatter } from '../../util/number-formatter';
import { Animations } from '../../util/animations';
import { trigger } from '@angular/animations';
import { UniverseService } from '../../services/universe.service';

@Component({
  selector: 'app-interstitial-one',
  templateUrl: './interstitial-one.component.html',
  styleUrls: ['./interstitial-one.component.scss'],
  animations: [
    trigger('wrapperTrigger', Animations.fadePresentTrigger(2000)),
    trigger('logTrigger', Animations.fadePresentTrigger(2000))
  ]
})
export class InterstitialOneComponent implements OnInit {
  showNova = false;
  showUniverse = true;
  showEntropy = false;
  logState = "present";

  stars: Star[];
  numberFormatter = new NumberFormatter();

  messageText = "The machines are gone, melted away in the impossibly intense heat." +
    "^2000 <br/><br/>Your seething plasma needs only one more ingredient before " +
    "it can give birth to a shiny new baby universe...";

  constructor(private universeService: UniverseService) { }

  ngOnInit() {
    this.stars = [];
    for (let i = 0; i < 20; i++) {
      this.stars.push({
        angle: Math.round(Math.random() * 360),
        duration: ((Math.random() * 3) + 2).toPrecision(4) + 1,
        delay: ((Math.random() * 5) + 4).toPrecision(4)
      })
    }
  }

  textCompleted(typed) {
    this.showEntropy = true;
  }

  addEntropy() {
    this.showNova = true;
    this.showEntropy = false;
    this.logState = "faded";
    setTimeout(() => this.transition(), 5000);
  }

  transition() {
    console.log("Transition to phase 2");
    // TODO: turn on the services again - autosave, machines etc
    this.universeService.transitionToPhase(2);
  }
}

interface Star {
  angle: number;
  duration: string;
  delay: string;
}
