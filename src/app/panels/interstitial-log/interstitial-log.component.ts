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
  @Input() texts: string[] = null;
  @Input() textDelay: number = 2000;
  @Input() textSpeed: string = "40";
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

    const strings: string[] = this.texts ? this.texts : [this.text];

    console.log("Strings: " + JSON.stringify(strings));

    this.typed = new Typed(".interstitial-log-area", {
      strings: strings,
      showCursor: false,
      typeSpeed: parseInt(this.textSpeed, 10),
      onComplete: (typed) => this.textCompleted.emit(this)
    });
  }

  fade() {
    this.logState = "faded";
  }
}
