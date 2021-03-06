import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { HelpPanelComponent } from '../help-panel/help-panel.component';
import { MatDialog } from '@angular/material';
import { LogPanelComponent } from '../log-panel/log-panel.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private logService: LogService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openHelp() {
    this.dialog.open(HelpPanelComponent);
  }

  openLogs() {
    // this.logService.toggleDrawer();
    // TODO show log panel
    this.dialog.open(LogPanelComponent);
  }

  newLogs(): number {
    return this.logService.newLogs;
  }
}
