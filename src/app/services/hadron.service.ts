import { Injectable } from '@angular/core';
import { UniverseService } from './universe.service';

@Injectable()
export class HadronService {

  constructor(private universeService: UniverseService) { }

  addPionWork(count: number) {
  }
}
