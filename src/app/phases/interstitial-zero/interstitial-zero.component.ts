import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../services/universe.service';

@Component({
  selector: 'app-interstitial-zero',
  templateUrl: './interstitial-zero.component.html',
  styleUrls: ['./interstitial-zero.component.scss']
})
export class InterstitialZeroComponent implements OnInit {

  constructor(private universeService: UniverseService) { }

  ngOnInit() {
    setTimeout(() => {
      this.universeService.transitionToPhase(1);
    }, 10000)
  }

}
