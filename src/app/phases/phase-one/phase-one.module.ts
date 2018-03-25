import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeploymentPanelComponent } from './panels/deployment-panel/deployment-panel.component';
import { ResearchPanelComponent } from './panels/research-panel/research-panel.component';
import { CollectionPanelComponent } from './panels/collection-panel/collection-panel.component';
import { ConstructionPanelComponent } from './panels/construction-panel/construction-panel.component';
import { StargameComponent } from './panels/stargame/stargame.component';
import { StargameDialogComponent } from './panels/stargame/stargame-dialog.component';
import { TemperaturePanelComponent } from './panels/temperature-panel/temperature-panel.component';
import { MatterCollectionPanelComponent } from './panels/matter-collection-panel/matter-collection-panel.component';
import { ButtonsModule } from '../../buttons/buttons.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdesignModule } from '../../mdesign/mdesign.module';
import { GameModule } from '../../games/game.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PanelsModule } from '../../panels/panels.module';
import { PhaseOneComponent } from './phase-one.component';

@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    BrowserAnimationsModule,
    MdesignModule,
    GameModule,
    PipesModule,
    PanelsModule
  ],
  declarations: [
    DeploymentPanelComponent,
    ResearchPanelComponent,
    CollectionPanelComponent,
    ConstructionPanelComponent,
    StargameComponent,
    StargameDialogComponent,
    TemperaturePanelComponent,
    MatterCollectionPanelComponent,
    PhaseOneComponent
  ],
  entryComponents: [
    StargameDialogComponent
  ],
  exports: [
    PhaseOneComponent,
  //   DeploymentPanelComponent,
  //   ResearchPanelComponent,
  //   CollectionPanelComponent,
  //   ConstructionPanelComponent,
  //   StargameComponent,
  //   StargameDialogComponent,
  //   TemperaturePanelComponent,
  //   MatterCollectionPanelComponent,
  ]

})
export class PhaseOneModule { }
