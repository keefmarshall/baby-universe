import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { StargameService } from 'app/games/stargame/stargame.service';
import { UniverseService } from 'app/services/universe.service';
import { ParticleFactory } from '../../../../physics/particle-factory';
import { QuarkUtils } from '../../../../physics/quark-utils';

@Component({
  selector: 'app-stargame',
  templateUrl: './stargame.component.html',
  styleUrls: ['./stargame.component.css']
})
export class StargameComponent implements AfterViewInit, OnDestroy {
  @Input() width =  380; //248;
  @Input() height = 380; //300;

  private particleFactory = new ParticleFactory();

  // NB if injecting MatDialogRef this component can only be used
  // as a dialog! Might be better off wrapping the game in an
  // outer component that holds the Dialog stuff, otherwise we
  // lose the option of embedding it into the main page.
  constructor(
    private stargameService: StargameService,
    public universeService: UniverseService
  ) { }

  ngAfterViewInit() {
    console.log("stargame component after view init");
    this.stargameService.initGame("stargame-canvas");
  }

  ngOnDestroy() {
    this.stargameService.stopGame();
    console.log("stargame component destroyed");
  }

  /**
   * Screen-reader-only functionality
   */
  addQuarks() {
    const qu = new QuarkUtils();
    const u = this.universeService.universe;
    const numDetectors = u.machines['MatterDetector'] ? u.machines['MatterDetector'].quantity : 0;
    const n = 1 + numDetectors;
    for (let i = 0; i < n; i++) {
      const quark = qu.randomQuark(u);
      this.particleFactory.collectParticleAndAnti(u, quark);
    }
  }

}
