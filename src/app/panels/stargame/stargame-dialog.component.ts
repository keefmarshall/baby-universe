import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StargameComponent } from 'app/panels/stargame/stargame.component';

@Component({
  selector: 'app-stargame-dialog',
  template: `
    <app-stargame [width]="width" [height]="height"></app-stargame>
    <button (click)="closeDialog()">Close</button> 
  `,
})
export class StargameDialogComponent {
    @Input() width = 400;
    @Input() height = 300;

    constructor(
        public dialogRef: MatDialogRef<StargameDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.width = data.width;
        this.height = data.height;
    }

    closeDialog() {
        this.dialogRef.close();
    }
}