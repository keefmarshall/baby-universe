import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrivancesComponent } from './panels/contrivances/contrivances.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContrivancesComponent],
  exports: [
    ContrivancesComponent
  ]
})
export class PhaseTwoModule { }
