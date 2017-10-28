import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeployButtonComponent } from './deploy-button/deploy-button.component';

import { MdesignModule } from '../mdesign/mdesign.module';


@NgModule({
  imports: [
    CommonModule,
    MdesignModule
  ],
  declarations: [DeployButtonComponent],
  exports: [DeployButtonComponent]
})
export class ButtonsModule { }
