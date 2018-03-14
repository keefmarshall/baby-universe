import { Component, OnInit } from '@angular/core';
import { ParticleFactory } from 'app/machines/particle-factory';
import { UniverseService } from 'app/services/universe.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { StargameComponent } from '../stargame/stargame.component';
import { Quarks1 } from 'app/research/matter';
import { StargameDialogComponent } from '../stargame/stargame-dialog.component';
import { MeteringService } from 'app/services/metering.service';
import { LogService } from 'app/services/log.service';

@Component({
  selector: 'app-collection-panel',
  templateUrl: './collection-panel.component.html',
  styleUrls: ['./collection-panel.component.css']
})
export class CollectionPanelComponent implements OnInit {
  private particleFactory = new ParticleFactory();

  constructor(
    public universeService: UniverseService,
    public meteringService: MeteringService,
    private logService: LogService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  collectPhoton() {
    console.log('Collected photon!');
    this.particleFactory.collectPhoton(this.universeService.universe, this.logService);
  }

  collectMatter() {
    const dialogRef = this.dialog.open(StargameDialogComponent, {
      height: '500px',
      width: '500px',
      data: { width: "400", height: "400" }
    });
  }

  showCollectMatter() {
    const props = this.universeService.universe.research[new Quarks1().name];
    return props != null ? props.researched : false;
  }
}
