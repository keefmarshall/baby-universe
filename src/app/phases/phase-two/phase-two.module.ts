import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrivancesComponent } from './panels/contrivances/contrivances.component';
import { MdesignModule } from '../../mdesign/mdesign.module';
import { PhaseTwoComponent } from './phase-two.component';
import { PanelsModule } from '../../panels/panels.module';
import { DeploymentPanelComponent } from './panels/deployment-panel/deployment-panel.component';
import { ButtonsModule } from '../../buttons/buttons.module';
import { ResearchPanelComponent } from './panels/research-panel/research-panel.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdesignModule,
    Angular2FontawesomeModule,
    ButtonsModule,
    PanelsModule,
    PipesModule
  ],
  declarations: [
    PhaseTwoComponent,
    ContrivancesComponent,
    DeploymentPanelComponent,
    ResearchPanelComponent
  ],
  exports: [
    PhaseTwoComponent
  ]
})
export class PhaseTwoModule { }
