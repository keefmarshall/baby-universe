import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrivancesComponent } from './panels/contrivances/contrivances.component';
import { MdesignModule } from '../../mdesign/mdesign.module';

@NgModule({
  imports: [
    CommonModule,
    MdesignModule
  ],
  declarations: [ContrivancesComponent],
  exports: [
    ContrivancesComponent
  ]
})
export class PhaseTwoModule { }
