import { Injectable } from '@angular/core';
import { ResearchProject } from 'app/research/research-project';
import { UniverseService } from 'app/services/universe.service';
import { Universe } from 'app/services/universe';
import { ResearchList } from 'app/research/research-list';

@Injectable()
export class ResearchService {
  public researchList;
  public currentProject: ResearchProject = null;

  // This is not a safe property to use except to calculate
  // rate of change! it does not represent the total science
  public scienceCount: number = 0;

  private readonly allProjects: {};

  constructor(
    private universeService: UniverseService
  ) {
    this.researchList = new ResearchList();
    this.allProjects = this.researchList.projects;
    this.initialise(universeService.universe);
  }

  isResearching(): boolean {
    return this.currentProject != null;
  }

  addScience(science: number) {
    this.scienceCount += science;
    if (this.currentProject != null) {
      this.currentProject.addScience(science, this.universeService.universe);
      this.saveProject();
      if (this.currentProject.isComplete()) {
        this.completeProject();
      }
    }
  }

  startProject(project: ResearchProject): boolean {
    // TODO: check for existence of some science machines!
    if (this.currentProject == null) {
        console.log("Starting new research project: " + project.name);
        this.openProject(project);
        return true;
    } else {
        console.log("Can't research new project, already busy!");
        return false;
    }
  }

  private openProject(project: ResearchProject) {
    this.currentProject = project;
    this.universeService.universe.currentResearchProject = project.name;
    this.saveProject();
  }

  private saveProject() {
    const p = this.currentProject;
    const u = this.universeService.universe;

    u.research[p.name] = {
      "scienceGained": p.currentScience(),
      "researched": p.isComplete()
    }
  }

  private completeProject() {
    const p = this.currentProject;
    const u = this.universeService.universe;

    console.log("Research complete: " + p.name);
    u.research[p.name].researched = true;
    this.currentProject = null;
    this.universeService.universe.currentResearchProject = null;
  }



  initialise(u: Universe) {
    console.log("Initialising research projects..");
    Object.keys(this.allProjects).forEach(pname => {
        if (u.research[pname] != null) {
            const project = this.allProjects[pname];
            project.addScience(u.research[pname].scienceGained);
        }
    });

    const currentName = this.universeService.universe.currentResearchProject;
    if (currentName != null) {
        this.currentProject = this.allProjects[currentName];
    }
  }


}
