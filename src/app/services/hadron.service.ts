import { Injectable } from '@angular/core';
import { UniverseService } from './universe.service';

@Injectable()
export class HadronService {
  private pionProgress = 0;
  private kaonProgress = 0;
  private protonProgress = 0;
  private neutronProgress = 0;

  constructor(private universeService: UniverseService) { }

  addPionWork(count: number) {
    this.pionProgress += count;
    if (this.pionProgress > 1) {
      const pions = Math.floor(this.pionProgress);
      if (this.canAfford('up', pions) && this.canAfford('down', pions)) {
          this.pionProgress = this.pionProgress % 1;
          this.addParticle('pion', pions);
          this.removeQuarks('up', pions);
          this.removeQuarks('down', pions);
      } else {
        // TODO: something!
      }

    }
  }

  addKaonWork(count: number) {
    this.kaonProgress += count;
    if (this.kaonProgress > 1) {
      const kaons = Math.floor(this.kaonProgress);
      if (this.canAfford('up', kaons) && this.canAfford('strange', kaons)) {
          this.kaonProgress = this.kaonProgress % 1;
          this.addParticle('kaon', kaons);
          this.removeQuarks('up', kaons);
          this.removeQuarks('strange', kaons);
      } else {
        // TODO: something!
      }
    }
  }

  private addParticle(type: string, count: number = 1) {
    const u = this.universeService.universe;
    u.particles[type] += count;
    u.antiparticles[type] += count;
  }

  private removeQuarks(type: string, count: number = 1) {
      const u = this.universeService.universe;
      u.particles[type + ' quark'] -= count;
      u.antiparticles[type + ' quark'] -= count;
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
      const t = `${type} quark`;
      return u.particles[t] && u.particles[t] >= count &&
          u.antiparticles[t] && u.antiparticles[t] >= count;
  }


}
