import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScientificPipe } from './scientific.pipe';
import {DecimalPipe} from '@angular/common';

@NgModule({
  providers: [DecimalPipe],
  imports: [
    CommonModule
  ],
  declarations: [
    ScientificPipe
  ],
  exports: [
    ScientificPipe
  ]
})
export class PipesModule { }
