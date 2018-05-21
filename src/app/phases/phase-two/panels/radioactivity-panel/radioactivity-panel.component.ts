import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../../../services/universe.service';
import { DecayDesignService } from '../../../../services/decay-design.service';
import { RadioactivityService } from '../../../../services/radioactivity.service';

@Component({
  selector: 'phase-two-radioactivity-panel',
  templateUrl: './radioactivity-panel.component.html',
  styleUrls: ['./radioactivity-panel.component.scss']
})
export class RadioactivityPanelComponent implements OnInit {

  constructor(
    public universeService: UniverseService,
    public decayDesignService: DecayDesignService,
    public radioactivityService: RadioactivityService
  ) { }

  ngOnInit() {
  }

  patternDesignProgress(): number {
    return this.universeService.universe.currentPatternDesignProgress * 100 /
          this.decayDesignService.requiredForNext;
  }
}
