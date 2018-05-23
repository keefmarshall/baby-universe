
import {share} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { Subject } from 'rxjs';

@Injectable()
export class LogService {
  public newLogs = 0;

  public logs: Array<String>;

  private _log$ = new Subject<string>();
  public log$ = this._log$.pipe(share());

  constructor(private universeService: UniverseService) {
    this.resetLogs();
  }

  resetLogs() {
    this.logs = this.universeService.universe.logs;
    this.newLogs = this.universeService.universe.newLogs || 0;
  }

  addLog(log: string) {
    this.universeService.universe.logs.push(log);
    this.newLogs++;
    this.universeService.universe.newLogs = this.newLogs;
    this._log$.next(log);
  }

  clearNewLogs() {
    this.newLogs = 0;
    this.universeService.universe.newLogs = this.newLogs;
  }
}
