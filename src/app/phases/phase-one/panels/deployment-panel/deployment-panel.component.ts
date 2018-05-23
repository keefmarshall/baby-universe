import { Component, OnInit } from '@angular/core';
import { MachineFactory } from 'app/machines/machine-factory';
import { UniverseService } from 'app/services/universe.service';
import { BulkDeployment, AdvancedBulkDeployment } from 'app/research/bulk-deployment';

@Component({
  selector: 'app-deployment-panel',
  templateUrl: './deployment-panel.component.html',
  styleUrls: ['./deployment-panel.component.css']
})
export class DeploymentPanelComponent implements OnInit {
  multiplier: string; // converted to number in deploy-button

  constructor(public machineFactory: MachineFactory,
    public universeService: UniverseService
  ) {
  }

  ngOnInit() {
    this.multiplier = "1";
  }

  onMultiplierChange(value: string) {
    this.multiplier = value;
  }

  bulk1(): boolean {
    return this.universeService.isResearched(new BulkDeployment());
  }

  bulk2(): boolean {
    return this.universeService.isResearched(new AdvancedBulkDeployment());
  }
}
