import { Component, OnInit, OnDestroy, state, transition, animate, style, trigger } from '@angular/core';
import { LogService } from 'app/services/log.service';
import { Subscription } from 'rxjs/Subscription';
import * as Typed from 'typed.js';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-log-drawer',
  templateUrl: './log-drawer.component.html',
  styleUrls: ['./log-drawer.component.scss'],
  animations: [
    trigger('logPanelTrigger', [
        state('expanded', style({ transform: 'scaleY(1)', 'transform-origin': 'top' })),
        state('collapsed', style({ transform: 'scaleY(0)', 'transform-origin': 'top'  })),
        transition('collapsed => expanded', animate('500ms ease-in')),
        transition('expanded => collapsed', animate('500ms ease-out'))
    ]),
  ]
})
export class LogDrawerComponent implements OnInit, OnDestroy, AfterViewInit {
  logDrawerState = "collapsed";

  private logsub: Subscription;
  private typed: Typed;
  private collapseTimerId;
  private busy = false;

  constructor(private logService: LogService) {
  }

  ngOnInit() {
    this.logsub = this.logService.log$.subscribe(text => {
      console.log("logsub fired");
      this.transition(text);
    });
  }

  ngAfterViewInit() {
    this.typed = new Typed(".log-line", {
      strings: [""],
      contentType: 'html',
      showCursor: false,
      typeSpeed: 40,
      onComplete: (typed) => { this.typingComplete(typed) }
    });
  }

  ngOnDestroy() {
    this.logsub.unsubscribe();
  }

  transition(text: string) {
    if (this.busy) {
      setTimeout(() => { this.transition(text); }, 1000);
      return;
    }
    this.busy = true;
    if (this.collapseTimerId) {
      clearTimeout(this.collapseTimerId);
    }
    this.logDrawerState = "expanded";
    this.typed.strings = [text + "  "];
    this.typed.reset(true);
   }

   typingComplete(typed: Typed) {
    console.log("Typing complete")
    this.collapseTimerId = setTimeout(() => {
      this.logDrawerState = "collapsed";
      this.busy = false;
    }, 3000);
   }
}
