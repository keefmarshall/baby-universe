import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TickerService } from '../../../../services/ticker.service';
import { MachineService } from '../../../../services/machine.service';
import { MachineFactory } from '../../../../machines/machine-factory';
import { UniverseService } from '../../../../services/universe.service';
import { Globals } from '../../../../globals';
import { ContrivanceService } from '../../../../services/contrivance.service';

@Component({
  selector: 'app-contrivances',
  templateUrl: './contrivances.component.html',
  styleUrls: ['./contrivances.component.scss']
})
export class ContrivancesComponent implements OnInit, OnDestroy {

  constructor(
    public universeService: UniverseService,
    public contrivanceService: ContrivanceService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  numContrivances(): number {
    const s = this.contrivanceService.state;
    return s.workingContraptions + s.faultyContraptions + s.brokenContraptions;
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
}
