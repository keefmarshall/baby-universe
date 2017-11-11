import { Component, OnInit } from '@angular/core';
import { ParticleFactory } from 'app/machines/particle-factory';
import { UniverseService } from 'app/services/universe.service';

@Component({
  selector: 'app-collection-panel',
  templateUrl: './collection-panel.component.html',
  styleUrls: ['./collection-panel.component.css']
})
export class CollectionPanelComponent implements OnInit {
  private particleFactory = new ParticleFactory();

  constructor(
    private universeService: UniverseService
  ) { }

  ngOnInit() {
  }

  collectPhoton() {
    console.log('Collected photon!');
    this.particleFactory.collectPhoton(this.universeService.universe);
  }

  collectMatter() {
    // TODO!
  }
}
