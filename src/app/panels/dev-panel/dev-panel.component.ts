import { Component, OnInit } from '@angular/core';
import { ParticleService } from '../../services/particle.service';
import { UniverseService } from '../../services/universe.service';

@Component({
  selector: 'app-dev-panel',
  templateUrl: './dev-panel.component.html',
  styleUrls: ['./dev-panel.component.css']
})
export class DevPanelComponent implements OnInit {

  constructor(
    private particleService: ParticleService,
    private universeService: UniverseService
  ) { }

  ngOnInit() {
  }

  collectPhoton() {
    console.log('Collected photon!');
    this.particleService.collectPhoton();
  }

  deployPhotonCollector() {
    console.log('Deployed photon collector!');
    this.universeService.universe.energy -= 5;
  }
}
