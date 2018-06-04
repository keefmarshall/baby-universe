import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScientificPipe } from './scientific.pipe';
import {DecimalPipe} from '@angular/common';
import { MevPipe } from './mev.pipe';
import { IllionPipe } from './illion.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
  providers: [DecimalPipe],
  imports: [
    CommonModule
  ],
  declarations: [
    ScientificPipe,
    MevPipe,
    IllionPipe,
    SafePipe
  ],
  exports: [
    ScientificPipe,
    MevPipe,
    IllionPipe,
    SafePipe
  ]
})
export class PipesModule { }
