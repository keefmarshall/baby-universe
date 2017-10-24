import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdesignModule } from './mdesign/mdesign.module';

import { AppComponent } from './app.component';

import { TickerService } from './services/ticker.service';
import { TickerComponent } from './ticker/ticker.component';

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
  providers: [TickerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
