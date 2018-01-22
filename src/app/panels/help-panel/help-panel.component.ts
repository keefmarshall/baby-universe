import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UniverseService } from 'app/services/universe.service';

@Component({
  selector: 'app-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.css']
})
export class HelpPanelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HelpPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public universeService: UniverseService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
