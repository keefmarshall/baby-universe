import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { HelpPanelComponent } from '../help-panel/help-panel.component';
import { MatDialog } from '@angular/material';

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
    this.logService.toggleDrawer();
  }


}
