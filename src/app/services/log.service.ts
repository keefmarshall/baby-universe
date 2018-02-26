import { Injectable } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LogService {
  public logs: Array<String>;

  public log$ = new Subject<string>();

  constructor(private universeService: UniverseService) {
    this.resetLogs();
  }

  resetLogs() {
    this.logs = this.universeService.universe.logs;
  }

  addLog(log: string) {
    this.universeService.universe.logs.push(log);
    this.log$.next(log);
  }

  toggleDrawer() {

  }
}
