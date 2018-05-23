import { Injectable } from '@angular/core';
import { UniverseService } from './universe.service';
import { ParticleFactory } from '../physics/particle-factory';
import { ALL_PARTICLES } from '../physics/particle';

@Injectable()
export class HadronService {
  private pionProgress = 0;
  private kaonProgress = 0;
  private protonProgress = 0;
  private neutronProgress = 0;

  private particleFactory: ParticleFactory;

  constructor(private universeService: UniverseService) { 
    this.particleFactory = new ParticleFactory();
  }

  // TODO: too much copy/paste here, must be a way to rationalise this

  addPionWork(count: number) {
    this.pionProgress += count;
    if (this.pionProgress > 1) {
      const pions = Math.floor(this.pionProgress);
      if (this.canAfford('u', pions) && this.canAfford('d', pions)) {
          this.pionProgress = this.pionProgress % 1;
          this.addParticle("π⁺", pions);
          this.removeQuarks('u', pions);
          this.removeQuarks('d', pions);
          this.removeGluons(2 * pions);
      } else {
        // TODO: something!
      }

    }
  }

  addKaonWork(count: number) {
    this.kaonProgress += count;
    if (this.kaonProgress > 1) {
      const kaons = Math.floor(this.kaonProgress);
      if (this.canAfford('u', kaons) && this.canAfford('s', kaons)) {
          this.kaonProgress = this.kaonProgress % 1;
          this.addParticle("K⁺", kaons);
          this.removeQuarks('u', kaons);
          this.removeQuarks('s', kaons);
          this.removeGluons(2 * kaons);
      } else {
        // TODO: something!
      }
    }
  }

  addProtonWork(count: number) {
    this.protonProgress += count;
    if (this.protonProgress > 1) {
      const protons = Math.floor(this.protonProgress);
      if (this.canAfford('u', protons * 2) && this.canAfford('d', protons)) {
          this.protonProgress = this.protonProgress % 1;
          this.addParticle('p', protons);
          this.removeQuarks('u', protons * 2);
          this.removeQuarks('d', protons);
          this.removeGluons(3 * protons);
      } else {
        // TODO: something!
      }
    }
  }

  addNeutronWork(count: number) {
    this.neutronProgress += count;
    if (this.neutronProgress > 1) {
      const neutrons = Math.floor(this.neutronProgress);
      if (this.canAfford('u', neutrons) && this.canAfford('d', neutrons * 2)) {
          this.neutronProgress = this.neutronProgress % 1;
          this.addParticle('n', neutrons);
          this.removeQuarks('u', neutrons);
          this.removeQuarks('d', neutrons * 2);
          this.removeGluons(3 * neutrons);
      } else {
        // TODO: something!
      }
    }
  }


  private addParticle(type: string, count: number = 1) {
    this.particleFactory.collectParticleAndAnti(this.universeService.universe, type, count);
  }

  private removeQuarks(type: string, count: number = 1) {
    this.particleFactory.removeParticleAndAnti(this.universeService.universe, type, count);
  }

  private removeGluons(count: number = 1) {
    this.particleFactory.removeParticle(this.universeService.universe, "g", count);
  }

  /**
   * To be honest, at time of writing it's highly unlikely that we'll run out of
   * quarks, but at some point during phase 2 they all need to be used up, so..
   *
   * This needs to be more sophisticated, so that when we do run out, we can
   * build the max possible, even if less than requested.
   */
  private canAfford(type, count): boolean {
      const u = this.universeService.universe;
      const p = ALL_PARTICLES[type];
      return u.matter[p.code] && u.matter[p.code] >= count &&
          u.matter[p.antiparticleCode] && u.matter[p.antiparticleCode] >= count;
  }

}
