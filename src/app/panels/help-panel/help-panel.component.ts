import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UniverseService } from 'app/services/universe.service';

@Component({
  selector: 'app-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.css']
})
export class HelpPanelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HelpPanelComponent>,
    public universeService: UniverseService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  showResearchPanel(): boolean {
    return this.universeService.universe.machines['PhotonicPhilosopher'] ||
      this.universeService.universe.phase >= 2;
  }

  showParticlePanel(): boolean {
    return this.universeService.universe.research['Matter: Quarks I'];
  }
}
