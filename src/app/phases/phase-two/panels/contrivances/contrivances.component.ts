import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UniverseService } from '../../../../services/universe.service';
import { ContrivanceService, ContrivanceEvent } from '../../../../services/contrivance.service';
import { Animations } from '../../../../util/animations';
import { trigger } from '@angular/animations';
import { ConstructionService } from '../../../../services/construction.service';
import { Globals } from '../../../../globals';
import { MeteringService } from '../../../../services/metering.service';

@Component({
  selector: 'phase-two-contrivances',
  templateUrl: './contrivances.component.html',
  styleUrls: ['./contrivances.component.scss'],
  animations: [
    trigger('workingTrigger', Animations.colorChangeTrigger('transparent', '#d7e3ce', 300)),
    trigger('faultyTrigger', Animations.colorChangeTrigger('transparent', '#f3b980', 300)),
    trigger('brokenTrigger', Animations.colorChangeTrigger('transparent', '#e691aa', 300)),
  ]
})
export class ContrivancesComponent implements OnInit, OnDestroy {
  private contrivanceEventSub: Subscription = null;

  workingState = "start";
  faultyState = "start";
  brokenState = "start";

  constructor(
    public universeService: UniverseService,
    public contrivanceService: ContrivanceService,
    public constructionService: ConstructionService,
    public meteringService: MeteringService
  ) { }

  ngOnInit() {
    this.contrivanceEventSub = this.contrivanceService.events$.subscribe(event => {
      this.handleContrivanceEvent(event);
    });
  }

  ngOnDestroy(): void {
    if (this.contrivanceEventSub) {
      this.contrivanceEventSub.unsubscribe();
    }
  }

  numContrivances(): number {
    return this.contrivanceService.totalContrivances();
  }

  buildContrivance() {
    this.contrivanceService.buildContrivance(1);
  }

  repairContrivance() {
    this.contrivanceService.repairContrivance(1);
  }

  salvageContrivance() {
    this.contrivanceService.salvageContrivance();
  }

  handleContrivanceEvent(event: ContrivanceEvent) {
    switch (event) {
      case ContrivanceEvent.NEW:
        this.flashColour("workingState");
        break;

      case ContrivanceEvent.FAULTY:
        this.flashColour("faultyState");
        break;

      case ContrivanceEvent.BROKEN:
        this.flashColour("brokenState");
        break;
    }
  }

  readContraptionEfficiency(): number {
    return Globals.round(this.universeService.universe.machines['Contraption'].efficiency, 1);
  }

  readWorkMeter(): number {
      return this.meteringService.read('work');
  }

  private flashColour(state: string) {
    this[state] = "end";
    setTimeout(() => { this[state] = "start"; }, 1000);    
  }
}
