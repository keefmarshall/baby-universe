import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// This is a module to encapsulate the material design components
import { MdesignModule } from './mdesign/mdesign.module';
import { PanelsModule } from './panels/panels.module';

// Central application services
import { AutosaveService } from './services/autosave.service';
import { MachineFactory } from './machines/machine-factory';
import { MachineService } from './services/machine.service';
import { MeteringService } from './services/metering.service';
import { ResearchService } from 'app/services/research.service';
import { TickerService } from './services/ticker.service';
import { TimeService } from './services/time.service';
import { UniverseService } from './services/universe.service';

// Top level components
import { AppComponent } from './app.component';
import { TickerComponent } from './ticker.component';
import { ConstructionService } from 'app/services/construction.service';
import { StateManagementService } from 'app/services/state-management.service';
import { LogService } from 'app/services/log.service';
import { HeatingService } from 'app/services/heating.service';

@NgModule({
  declarations: [
    AppComponent
    // TickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdesignModule,
    PanelsModule
  ],
  providers: [
    AutosaveService,
    ConstructionService,
    HeatingService,
    LogService,
    MachineFactory,
    MachineService,
    MeteringService,
    ResearchService,
    StateManagementService,
    TickerService,
    TimeService,
    UniverseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
