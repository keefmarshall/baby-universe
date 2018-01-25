import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Universe } from 'app/services/universe';

@Injectable()
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  send(payload: any) {
    console.log("sending analytics payload: " + JSON.stringify(payload));
    const ret = this.http.get("/stats", { params: payload }).subscribe(res => {
      console.log("analytics response: " + res);
    })
  }

  start(u: Universe) {
    this.send({
      "event": "start",
      "uuid": u.id,
    });
  }

  endPhase1(u: Universe, score: number) {
    this.send({
      "event": "end1",
      "uuid": u.id,
      "score": score,
      "elapsed": u.elapsedSeconds
    });
  }

}
