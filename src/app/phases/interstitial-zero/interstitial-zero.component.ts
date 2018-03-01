import { Component, OnInit, OnDestroy } from '@angular/core';
import { UniverseService } from '../../services/universe.service';
import { trigger, style, state, transition, animate, group } from '@angular/animations';
import * as Typed from 'typed.js';

const fadePresentTrigger = [
  state('present', style({ opacity: 1 })),
  state('faded', style({ opacity: 0 })),
  transition('present => faded', [
    animate('2000ms', style({ opacity: 0 }))
  ]),
  transition('faded => present', [
    animate('2000ms', style({ opacity: 1 })),
  ]),
];

@Component({
  selector: 'app-interstitial-zero',
  templateUrl: './interstitial-zero.component.html',
  styleUrls: ['./interstitial-zero.component.scss'],
  animations: [
    trigger('wrapperTrigger', fadePresentTrigger),
    trigger('logTrigger', fadePresentTrigger),
    trigger('imageTrigger', fadePresentTrigger)
  ]
})
export class InterstitialZeroComponent implements OnInit {
  wrapperState = "present";
  logState = "faded";
  imageState = "present";

  private typed: Typed;

  private readonly introtext = [
    "Within the empty void, matter and energy spontaneously " +
    "flash into existence... ^2000 <br/><br/>...only to decay almost instantly."
  ]

  constructor(private universeService: UniverseService) { }

  ngOnInit() {
    this.imageState = "present";
    setTimeout(() => {
      this.firstDelay();
    }, 2000)
  }

  firstDelay() {
    this.logState = "present";
    this.imageState = "faded";

    this.typed = new Typed(".log-area", {
      strings: this.introtext,
      showCursor: false,
      typeSpeed: 40,
      onComplete: (typed) => { this.typingComplete(typed) }
    });
  }

  typingComplete(typed) {
    setTimeout(() => {
      this.wrapperState = "faded";
    }, 3000);
    setTimeout(() => {
      this.universeService.transitionToPhase(1);
    }, 5000);
  }
}
