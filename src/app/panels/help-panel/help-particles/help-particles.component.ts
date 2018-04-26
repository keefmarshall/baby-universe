import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../../services/universe.service';
import { Quarks2, Quarks3 } from '../../../research/matter';
import { QuantumChromodynamics } from '../../../research/collection';
import { WZBosons } from '../../../research/radioactivity';
import { Electrons, Muons, Tauons, Neutrinos } from '../../../research/matter2';

@Component({
  selector: 'app-help-particles',
  templateUrl: './help-particles.component.html',
  styleUrls: ['./help-particles.component.scss']
})
export class HelpParticlesComponent implements OnInit {

  constructor(private universeService: UniverseService) { }

  ngOnInit() {
  }

  showQuarks2(): boolean {
    return this.universeService.isResearched(new Quarks2());
  }

  showQuarks3(): boolean {
    return this.universeService.isResearched(new Quarks3());
  }

  showGluons(): boolean {
    return this.universeService.isResearched(new QuantumChromodynamics());
  }

  showWZBosons(): boolean {
    return this.universeService.isResearched(new WZBosons());
  }

  showElectrons(): boolean {
    return this.universeService.isResearched(new Electrons());
  }

  showMuons(): boolean {
    return this.universeService.isResearched(new Muons());
  }

  showTauons(): boolean {
    return this.universeService.isResearched(new Tauons());
  }

  showNeutrinos(): boolean {
    return this.universeService.isResearched(new Neutrinos());
  }

}
