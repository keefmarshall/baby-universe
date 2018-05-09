import { Component, OnDestroy, ViewChild, ViewChildren,
          QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LogService } from '../../services/log.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.scss']
})
export class LogPanelComponent implements OnDestroy, AfterViewInit {
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;

  private changesub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<LogPanelComponent>,
    public logService: LogService,
    public sanitizer: DomSanitizer
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.logService.clearNewLogs();
    this.changesub.unsubscribe(); // should always clean up
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.changesub = this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

}
