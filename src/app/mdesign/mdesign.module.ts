import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule
  ],
  exports: [
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule
  ],
  declarations: []
})
export class MdesignModule { }
