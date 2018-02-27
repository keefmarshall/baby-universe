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
import { GameModule } from 'app/games/game.module';
import { TickerComponent } from 'app/ticker.component';
import { TemperaturePanelComponent } from './temperature-panel/temperature-panel.component';
import { PipesModule } from 'app/pipes/pipes.module';
import { MatterTableComponent } from './matter-table/matter-table.component';
import { FinalScoreComponent } from './final-score/final-score.component';
import { HelpPanelComponent } from './help-panel/help-panel.component';
import { HelpUnitsComponent } from './help-panel/help-units/help-units.component';
import { HelpMachinesComponent } from './help-panel/help-machines/help-machines.component';
import { HelpResearchComponent } from './help-panel/help-research/help-research.component';
import { MatterCollectionPanelComponent } from './matter-collection-panel/matter-collection-panel.component';
import { LogDrawerComponent } from './log-drawer/log-drawer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    BrowserAnimationsModule,
    MdesignModule,
    GameModule,
    PipesModule
  ],
  declarations: [
    DevPanelComponent,
    DeploymentPanelComponent,
    ResearchPanelComponent,
    CollectionPanelComponent,
    ConstructionPanelComponent,
    StargameComponent,
    StargameDialogComponent,
    TickerComponent,
    TemperaturePanelComponent,
    MatterTableComponent,
    FinalScoreComponent,
    HelpPanelComponent,
    HelpUnitsComponent,
    HelpMachinesComponent,
    HelpResearchComponent,
    MatterCollectionPanelComponent,
    LogDrawerComponent,
    HeaderComponent
  ],
  entryComponents: [
    StargameDialogComponent,
    HelpPanelComponent
  ],
  exports: [
    DevPanelComponent,
    DeploymentPanelComponent,
    ResearchPanelComponent,
    CollectionPanelComponent,
    ConstructionPanelComponent,
    StargameComponent,
    StargameDialogComponent,
    TickerComponent,
    TemperaturePanelComponent,
    MatterTableComponent,
    FinalScoreComponent,
    HelpPanelComponent,
    MatterCollectionPanelComponent,
    LogDrawerComponent,
    HeaderComponent
  ]
})
export class PanelsModule { }
