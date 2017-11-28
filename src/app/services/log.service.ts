import { Injectable } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';

@Injectable()
export class LogService {
  public logs: Array<String>;

  constructor(private universeService: UniverseService) {
    this.resetLogs();
  }

  resetLogs() {
    this.logs = this.universeService.universe.logs;
  }

  addLog(log: string) {
    this.universeService.universe.logs.push(log);
  }
}
