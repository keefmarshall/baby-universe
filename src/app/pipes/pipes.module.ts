import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScientificPipe } from './scientific.pipe';
import {DecimalPipe} from '@angular/common';
import { MevPipe } from './mev.pipe';
import { IllionPipe } from './illion.pipe';

@NgModule({
  providers: [DecimalPipe],
  imports: [
    CommonModule
  ],
  declarations: [
    ScientificPipe,
    MevPipe,
    IllionPipe
  ],
  exports: [
    ScientificPipe,
    MevPipe,
    IllionPipe
  ]
})
export class PipesModule { }
