import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeployButtonComponent } from './deploy-button/deploy-button.component';

import { MdesignModule } from '../mdesign/mdesign.module';
import { NumberPickerComponent } from './number-picker/number-picker.component';


@NgModule({
  imports: [
    CommonModule,
    MdesignModule
  ],
  declarations: [DeployButtonComponent, NumberPickerComponent],
  exports: [DeployButtonComponent, NumberPickerComponent]
})
export class ButtonsModule { }
