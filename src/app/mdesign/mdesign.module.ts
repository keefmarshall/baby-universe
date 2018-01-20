import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatSlideToggleModule,
  MatSlideToggle,
  MatTooltipModule
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
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  exports: [
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MdesignModule { }
