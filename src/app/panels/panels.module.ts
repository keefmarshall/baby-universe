import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevPanelComponent } from './dev-panel/dev-panel.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// This is a module to encapsulate the material design components
import { MdesignModule } from '../mdesign/mdesign.module';

import { ButtonsModule } from '../buttons/buttons.module';
import { DeploymentPanelComponent } from './deployment-panel/deployment-panel.component';
import { ResearchPanelComponent } from './research-panel/research-panel.component';
import { CollectionPanelComponent } from './collection-panel/collection-panel.component';
import { ConstructionPanelComponent } from './construction-panel/construction-panel.component';

@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    BrowserAnimationsModule,
    MdesignModule
  ],
  declarations: [
    DevPanelComponent,
    DeploymentPanelComponent,
    ResearchPanelComponent,
    CollectionPanelComponent,
    ConstructionPanelComponent
  ],
  exports: [
    DevPanelComponent,
    DeploymentPanelComponent,
    ResearchPanelComponent,
    CollectionPanelComponent,
    ConstructionPanelComponent
  ]
})
export class PanelsModule { }
