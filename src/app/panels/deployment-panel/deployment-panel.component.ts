import { Component, OnInit } from '@angular/core';
import { MachineFactory } from 'app/machines/machine-factory';

@Component({
  selector: 'app-deployment-panel',
  templateUrl: './deployment-panel.component.html',
  styleUrls: ['./deployment-panel.component.css']
})
export class DeploymentPanelComponent implements OnInit {

  constructor(public machineFactory: MachineFactory) { }

  ngOnInit() {
  }

}
