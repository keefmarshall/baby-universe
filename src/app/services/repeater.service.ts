import { Injectable, OnDestroy } from '@angular/core';
import { UniverseService } from './universe.service';
import { ConstructionService, ConstructionEvent } from './construction.service';
import { ConstructionProject } from '../machines/construction-project';
import { Subscription } from 'rxjs';

@Injectable()
export class RepeaterService implements OnDestroy {
  private cesub: Subscription = null;
  
  constructor(
    private universeService: UniverseService,
    private constructionService: ConstructionService
  ) {     
    if (this.universeService.universe.machines['Repeater']) {
      this.init();
    }
  }

  init() {
    if (this.cesub) {
      console.log("Repeater: already initialised");
    } else {
      console.log("Repeater: initialising");
      this.cesub = this.constructionService.events$.subscribe(
        (event) => this.onConstructionEvent(event));
    }
  }

  start() {
    this.repeaterProperties()['on'] = true;
  }

  stop() {
    this.repeaterProperties()['on'] = false;
  }

  isOn(): boolean {
    return this.repeaterProperties()['on'];
  }

  private onConstructionEvent(event: ConstructionEvent) {
    if (this.repeaterProperties()['on']) {
        switch(event.type) {
            case "completed":
                this.construct(event.project);
                break;
            
            default:
                // do nothing
        }
    }
  }

  private construct(project: ConstructionProject) {
    var success = false;
    if (project.affordable() && !this.constructionService.isConstructing()) {
        console.log(`Repeater: attempting to repeat ${project.name}`);
        success = this.constructionService.construct(project);
    }

    if (!success) {
        console.log(`Shutting off repeater - ${project.name} not constructable at this time`);
        this.stop();
    }
  }

  private repeaterProperties() {
    if (this.universeService.universe.machines['Repeater']) {
      return this.universeService.universe.machines['Repeater'].extras;
    } else {
      return { on: false };
    }
  }

  ngOnDestroy() {
    if (this.cesub) {
      this.cesub.unsubscribe();
    }
  }
}
