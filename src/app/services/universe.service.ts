import { Injectable } from '@angular/core';
import { Universe } from './universe';

@Injectable()
export class UniverseService {
  public universe: Universe;

  public readonly id: number;

  constructor() {
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
    if (u.phase == null) u.phase = 1;
    if (u.machines == null) u.machines = {};
    if (u.research == null) u.research = {};
    
    if (!u.currentResearchProject) u.currentResearchProject = null;
    if (!u.currentConstructionProject) u.currentConstructionProject = null;

    if (!u.particles) u.particles = {};
    if (!u.antiparticles) u.antiparticles = {};

    if (!u.logs) {
      u.logs = ["...", "...", "...", "...", "...", "...",
          "Within the empty void, matter and energy spontaneously " +
          "flash into existence, only to decay almost instantly. "];
    }
  }
}
