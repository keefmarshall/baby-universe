import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// This is a module to encapsulate the material design components
import { MdesignModule } from './mdesign/mdesign.module';

// Central application services
import { AutosaveService } from './services/autosave.service';
import { TickerService } from './services/ticker.service';
import { TimeService } from './services/time.service';
import { UniverseService } from './services/universe.service';

// Top level components
import { AppComponent } from './app.component';
import { TickerComponent } from './ticker.component';

@NgModule({
  declarations: [
    AppComponent,
    TickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdesignModule
  ],
  providers: [AutosaveService, TickerService, TimeService, UniverseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
