import { Injectable } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LogService {
  public logs: Array<String>;

  private _log$ = new Subject<string>();
  public log$ = this._log$.share();

  constructor(private universeService: UniverseService) {
    this.resetLogs();
  }

  resetLogs() {
    this.logs = this.universeService.universe.logs;
  }

  addLog(log: string) {
    this.universeService.universe.logs.push(log);
    this._log$.next(log);
  }

  toggleDrawer() {

  }
}
