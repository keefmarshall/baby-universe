import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScientificPipe } from './scientific.pipe';
import {DecimalPipe} from '@angular/common';
import { MevPipe } from './mev.pipe';

@NgModule({
  providers: [DecimalPipe],
  imports: [
    CommonModule
  ],
  declarations: [
    ScientificPipe,
    MevPipe
  ],
  exports: [
    ScientificPipe,
    MevPipe
  ]
})
export class PipesModule { }
