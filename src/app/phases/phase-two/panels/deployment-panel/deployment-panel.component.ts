import { Component, OnInit } from '@angular/core';
import { MachineFactory } from '../../../../machines/machine-factory';

@Component({
  selector: 'phase-two-deployment-panel',
  templateUrl: './deployment-panel.component.html',
  styleUrls: ['./deployment-panel.component.scss']
})
export class DeploymentPanelComponent implements OnInit {
  multipler = 1;

  constructor(public machineFactory: MachineFactory) { }

  ngOnInit() {
  }

}
