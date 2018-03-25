import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrivancesComponent } from './panels/contrivances/contrivances.component';
import { MdesignModule } from '../../mdesign/mdesign.module';
import { PhaseTwoComponent } from './phase-two.component';
import { PanelsModule } from '../../panels/panels.module';

@NgModule({
  imports: [
    CommonModule,
    MdesignModule,
    PanelsModule
  ],
  declarations: [
    PhaseTwoComponent,
    ContrivancesComponent
  ],
  exports: [
    PhaseTwoComponent
  ]
})
export class PhaseTwoModule { }
