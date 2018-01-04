import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatProgressBarModule,
  MatIconModule,
  MatSlideToggleModule,
  MatSlideToggle
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  exports: [
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  declarations: []
})
export class MdesignModule { }
