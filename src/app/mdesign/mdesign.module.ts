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
    FormsModule, ReactiveFormsModule,
    
    MatToolbarModule,
    // MatGridListModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    MatButtonToggleModule,
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
