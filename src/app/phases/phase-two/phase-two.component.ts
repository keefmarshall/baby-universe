import { Component, OnInit } from '@angular/core';
import { Animations } from '../../util/animations';
import { trigger } from '@angular/animations';
import { UniverseService } from '../../services/universe.service';

@Component({
  selector: 'app-phase-two',
  templateUrl: './phase-two.component.html',
  styleUrls: ['./phase-two.component.scss']
})
export class PhaseTwoComponent implements OnInit {
  showLogs = false;

  messageText: string[] = [
    "Suddenly your universe is expanding.^1000<br/><br/>" +
      "The temperature that you worked so hard to build is dropping.",
    "Without the comfort of the void, bereft of your machines, you feel lost.^1000<br/><br/>" +
      "The old techniques and skills are useless here.",
    "Eventually, you realise that you could fashion a crude, basic tool..."
  ].map(text => text + "^2000");

  constructor(private universeService: UniverseService) { }

  ngOnInit() {
    // First time through, show message
    if (!this.universeService.universe.phase2MessageSeen) {
      this.showLogs = true;
      this.universeService.universe.phase2MessageSeen = true;
    }
  }

  textCompleted($event) {
    console.log("Text completed: " + $event);
    setTimeout(() => {
      $event.fade();
      console.log("Set logstate to faded");
      setTimeout(() => this.showLogs = false, 2000);
    }, 2000);
  }

  showDeploymentPanel(): boolean {
    return this.universeService.universe.machines['Contraption']
  }

  showResearchPanel(): boolean {
    return this.universeService.universe.machines["RudimentaryResearcher"];
  }

  showHadronPanel(): boolean {
    return this.universeService.universe.machines["MesonManufacturer"];
  }
}
