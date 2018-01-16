import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { StargameService } from 'app/games/stargame/stargame.service';
import { UniverseService } from 'app/services/universe.service';

@Component({
  selector: 'app-stargame',
  templateUrl: './stargame.component.html',
  styleUrls: ['./stargame.component.css']
})
export class StargameComponent implements AfterViewInit {
  @Input() width =  380; //248;
  @Input() height = 380; //300;

  // NB if injecting MatDialogRef this component can only be used
  // as a dialog! Might be better off wrapping the game in an
  // outer component that holds the Dialog stuff, otherwise we
  // lose the option of embedding it into the main page.
  constructor(
    private stargameService: StargameService,
    public universeService: UniverseService
  ) { }

  ngAfterViewInit() {
    this.stargameService.initGame("stargame-canvas");
  }


}
