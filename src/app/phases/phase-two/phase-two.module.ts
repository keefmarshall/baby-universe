import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrivancesComponent } from './panels/contrivances/contrivances.component';
import { MdesignModule } from '../../mdesign/mdesign.module';
import { PhaseTwoComponent } from './phase-two.component';
import { PanelsModule } from '../../panels/panels.module';
import { DeploymentPanelComponent } from './panels/deployment-panel/deployment-panel.component';
import { ButtonsModule } from '../../buttons/buttons.module';

@NgModule({
  imports: [
    CommonModule,
    MdesignModule,
    ButtonsModule,
    PanelsModule
  ],
  declarations: [
    PhaseTwoComponent,
    ContrivancesComponent,
    DeploymentPanelComponent
  ],
  exports: [
    PhaseTwoComponent
  ]
})
export class PhaseTwoModule { }
