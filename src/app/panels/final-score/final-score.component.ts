import { Component, OnInit } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';

@Component({
  selector: 'app-final-score',
  templateUrl: './final-score.component.html',
  styleUrls: ['./final-score.component.css']
})
export class FinalScoreComponent implements OnInit {

  constructor(private universeService: UniverseService) { }

  ngOnInit() {
  }

  finalScore(): number {
    // arbitrary number - goes up with order of magnitude of particles,
    // down with the total number of seconds elapsed.

    // can't be bothered to add up all the particles for now, let's just
    // use gluons as a decent measure:
    const u = this.universeService.universe;
    const particleScore = Math.pow(Math.log10(u.particles["gluon"]), 2) * 1000;
    const timeScore = u.elapsedSeconds / 60;

    return Math.round(particleScore / timeScore);
  }

  resetUniverse() {
    const confirm = window.confirm('This will erase all progress, are you sure?');
    if (confirm) {
      this.universeService.resetUniverse();
      window.location.reload();
    }
  }

}
