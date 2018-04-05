import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatToolbarModule,
  // MatGridListModule,
  MatButtonModule,
  MatButtonToggleModule,
  // MatCardModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatSlideToggleModule,
  MatSlideToggle,
  MatTooltipModule,
  MatTabsModule,
  MatSliderModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    // MatGridListModule,
    MatButtonModule,
    MatButtonToggleModule,
    // MatCardModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatTabsModule
  ],
  exports: [
    MatToolbarModule,
    // MatGridListModule,
    MatButtonModule,
    MatButtonToggleModule,
    // MatCardModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatTabsModule
  ],
  declarations: []
})
export class MdesignModule { }
