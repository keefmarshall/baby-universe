import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatProgressBarModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule
  ],
  declarations: []
})
export class MdesignModule { }
