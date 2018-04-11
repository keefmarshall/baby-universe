import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevPanelComponent } from './dev-panel/dev-panel.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// This is a module to encapsulate the material design components
import { MdesignModule } from '../mdesign/mdesign.module';

import { ButtonsModule } from '../buttons/buttons.module';
import { TickerComponent } from 'app/ticker.component';
import { PipesModule } from 'app/pipes/pipes.module';
import { MatterTableComponent } from './matter-table/matter-table.component';
import { FinalScoreComponent } from './final-score/final-score.component';
import { HelpPanelComponent } from './help-panel/help-panel.component';
import { HelpUnitsComponent } from './help-panel/help-units/help-units.component';
import { HelpMachinesComponent } from './help-panel/help-machines/help-machines.component';
import { HelpResearchComponent } from './help-panel/help-research/help-research.component';
import { LogDrawerComponent } from './log-drawer/log-drawer.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogPanelComponent } from './log-panel/log-panel.component';
import { InterstitialLogComponent } from './interstitial-log/interstitial-log.component';
import { TemperatureComponent } from './temperature/temperature.component';

@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    BrowserAnimationsModule,
    MdesignModule,
    PipesModule
  ],
  declarations: [
    DevPanelComponent,
    TickerComponent,
    MatterTableComponent,
    FinalScoreComponent,
    HelpPanelComponent,
    HelpUnitsComponent,
    HelpMachinesComponent,
    HelpResearchComponent,
    LogDrawerComponent,
    HeaderComponent,
    FooterComponent,
    LogPanelComponent,
    InterstitialLogComponent,
    TemperatureComponent
  ],
  entryComponents: [
    HelpPanelComponent,
    LogPanelComponent
  ],
  exports: [
    DevPanelComponent,
    TickerComponent,
    MatterTableComponent,
    FinalScoreComponent,
    HelpPanelComponent,
    LogDrawerComponent,
    HeaderComponent,
    FooterComponent,
    InterstitialLogComponent,
    TemperatureComponent
  ]
})
export class PanelsModule { }
