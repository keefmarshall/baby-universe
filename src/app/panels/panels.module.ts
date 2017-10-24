import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevPanelComponent } from './dev-panel/dev-panel.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// This is a module to encapsulate the material design components
import { MdesignModule } from '../mdesign/mdesign.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MdesignModule
  ],
  declarations: [DevPanelComponent],
  exports: [DevPanelComponent]
})
export class PanelsModule { }
