import { Component, OnInit } from '@angular/core';
import { UniverseService } from 'app/services/universe.service';
import { AutosaveService } from 'app/services/autosave.service';
import { AnalyticsService } from 'app/services/analytics.service';

@Component({
  selector: 'app-final-score',
  templateUrl: './final-score.component.html',
  styleUrls: ['./final-score.component.css']
})
export class FinalScoreComponent implements OnInit {

  constructor(private universeService: UniverseService,
    private autoSaveService: AutosaveService,
    private analytics: AnalyticsService
  ) { }

  ngOnInit() {
  }

  finalScore(): number {
    return this.universeService.finalScorePhase1();
  }

  resetUniverse() {
    const confirm = window.confirm('This will erase all progress, are you sure?');
    if (confirm) {
      this.universeService.resetUniverse();
      this.autoSaveService.autosave();
      window.location.reload();
    }
  }

}
