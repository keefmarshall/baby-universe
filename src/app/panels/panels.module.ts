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
import { StargameComponent } from './stargame/stargame.component';
import { StargameDialogComponent } from 'app/panels/stargame/stargame-dialog.component';

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
    ConstructionPanelComponent,
    StargameComponent,
    StargameDialogComponent
  ],
  entryComponents: [
    StargameDialogComponent
  ],
  exports: [
    DevPanelComponent,
    DeploymentPanelComponent,
    ResearchPanelComponent,
    CollectionPanelComponent,
    ConstructionPanelComponent,
    StargameComponent,
    StargameDialogComponent
  ]
})
export class PanelsModule { }
