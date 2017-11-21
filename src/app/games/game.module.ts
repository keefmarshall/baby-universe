import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StargameService } from 'app/games/stargame/stargame.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    StargameService
  ],
  declarations: []
})
export class GameModule { }
