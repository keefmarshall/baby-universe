import { Component, OnInit } from '@angular/core';
import { MachineFactory } from '../../../../machines/machine-factory';
import { Repeater } from '../../../../machines/repeater';
import { UniverseService } from '../../../../services/universe.service';
import { RepeaterService } from '../../../../services/repeater.service';

@Component({
  selector: 'phase-two-deployment-panel',
  templateUrl: './deployment-panel.component.html',
  styleUrls: ['./deployment-panel.component.scss']
})
export class DeploymentPanelComponent implements OnInit {
  multipler = 1;

  constructor(
    public universeService: UniverseService,
    public machineFactory: MachineFactory,
    public repeaterService: RepeaterService
  ) { }

  ngOnInit() {
  }

  isRepeating() {
    return this.repeaterService.isOn();  
  }

  onSwitchChange($event) {
    if ($event.source.checked) {
      this.repeaterService.start();
    } else {
      this.repeaterService.stop();
    }
  }
}
