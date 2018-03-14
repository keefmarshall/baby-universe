import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Typed from 'typed.js';
import { Animations } from '../../util/animations';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-interstitial-log',
  templateUrl: './interstitial-log.component.html',
  styleUrls: ['./interstitial-log.component.scss'],
  animations: [
    trigger('logTrigger', Animations.fadePresentTrigger())
  ]
})
export class InterstitialLogComponent implements OnInit {
  @Input() text: string = "";
  @Input() textDelay: number = 2000;
  @Output() textCompleted = new EventEmitter();

  logState = "faded";

  private typed: Typed;

  constructor() { }

  ngOnInit() {
    console.log(`InterstitialLog: init: delay = ${this.textDelay}`);
    setTimeout(() => {
      this.doText();
    }, this.textDelay)
  }

  doText() {
    console.log(`InterstitialLog: doText(), text=${this.text}.`);
    this.logState = "present";

    this.typed = new Typed(".interstitial-log-area", {
      strings: [this.text],
      showCursor: false,
      typeSpeed: 40,
      onComplete: (typed) => this.textCompleted.emit(typed)
    });
  }
}
