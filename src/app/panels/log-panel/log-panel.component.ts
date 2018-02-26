import { Component, ViewChildren, ViewChild, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { LogService } from 'app/services/log.service';

/**
 * See: https://stackoverflow.com/a/45655337
 * and: https://stackoverflow.com/a/17044731
 */

@Component({
  selector: 'app-log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.scss']
})
export class LogPanelComponent implements AfterViewInit {

  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;

  constructor(
    public logService: LogService
  ) { }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
    setTimeout(this.scrollToBottom, 1000);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
