import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  // MatGridListModule,
  MatButtonModule,
  // MatCardModule,
  MatDialogModule,
  MatProgressBarModule,
  // MatProgressSpinnerModule,
  MatIconModule,
  MatSlideToggleModule,
  MatSlideToggle,
  MatTooltipModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    // MatGridListModule,
    MatButtonModule,
    // MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    // MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatTabsModule
  ],
  exports: [
    MatToolbarModule,
    // MatGridListModule,
    MatButtonModule,
    // MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    // MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatTabsModule
  ],
  declarations: []
})
export class MdesignModule { }
