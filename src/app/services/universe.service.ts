import { Injectable } from '@angular/core';
import { Universe } from './universe';
import { Subject } from 'rxjs/Subject';
import { UUID } from 'angular2-uuid';
import { AnalyticsService } from 'app/services/analytics.service';
import { ResearchProject } from 'app/research/research-project';

@Injectable()
export class UniverseService {
  public universe: Universe;

  public readonly id: number;

  public phase$ = new Subject<number>();

  constructor(private analytics: AnalyticsService) {
    this.id = Math.floor(Math.random() * 100);

    this.loadUniverse();
    console.log('Universe constructed: ' + JSON.stringify(this.universe));
    console.log("Universe ID: " + this.id);
  }

  saveUniverse() {
    localStorage.setItem('universe', JSON.stringify(this.universe));
  }

  loadUniverse() {
    const ustr = localStorage.getItem('universe');
    if (ustr != null) {
      console.log("Loading universe from local storage..");
      this.universe = JSON.parse(ustr);
      this.initialiseNew(this.universe);
    } else {
      console.log("Creating fresh universe..");
      this.universe = new Universe;
      this.analytics.start(this.universe);
    }
  }

  resetUniverse() {
    this.universe = new Universe;
  }

  /**
   * Mostly during development - this handles the case where there's a new
   * property in the Universe object that is not in the saved version, we
   * need to initialise it properly otherwise stuff breaks
   */
  initialiseNew(u: Universe) {
    if (u.id == null) u.id = UUID.UUID();
    if (u.phase == null) u.phase = 1;
    if (u.machines == null) u.machines = {};
    if (u.research == null) u.research = {};
    
    if (!u.currentResearchProject) u.currentResearchProject = null;
    if (!u.currentConstructionProject) u.currentConstructionProject = null;
    if (!u.currentConstructionWork) u.currentConstructionWork = 0;
    
    if (!u.particles) u.particles = {};
    if (!u.antiparticles) u.antiparticles = {};

    if (!u.logs) {
      u.logs = [ // "...", "...", "...", "...", "...", "...",
          "Within the empty void, matter and energy spontaneously " +
          "flash into existence, only to decay almost instantly. "];
    }

    if (u.machines['Assembler'] && !u.machines['Assembler'].extras['energyDraw']) {
      u.machines['Assembler'].extras['energyDraw'] = 1;
    }

    if (u.machines['SpaceHeater'] && !u.machines['SpaceHeater'].extras['energyDraw']) {
      u.machines['SpaceHeater'].extras['energyDraw'] = 1;
    }

  }

  finalScorePhase1(): number {
    // arbitrary number - goes up with order of magnitude of particles,
    // down with the total number of seconds elapsed.

    // can't be bothered to add up all the particles for now, let's just
    // use gluons as a decent measure:
    const u = this.universe;
    const particleScore = Math.pow(Math.log10(u.particles["gluon"]), 2) * 1000;
    const timeScore = u.elapsedSeconds / 60;

    return Math.round(particleScore / timeScore);
  }

  isResearched(research: ResearchProject) {
    const u = this.universe;
    if (u.research[research.name] && u.research[research.name].researched) {
      return true;
    } else {
      return false;
    }
  }
}
