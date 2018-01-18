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
    this.initialise();
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

  stopProject() {
    if (this.currentProject != null) {
      const p = this.currentProject;
      const u = this.universeService.universe;
      console.log("Stopping research on " + p.name);

      p.reset();
      u.research[p.name] = null;
      this.currentProject = null;
      u.currentResearchProject = null;

    } else {
      console.log("no project to stop!");
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



  initialise() {
    console.log("Initialising research projects..");
    const u = this.universeService.universe;

    Object.keys(this.allProjects).forEach(pname => {
      const project = this.allProjects[pname];
      if (u.research[pname] != null && !u.research[pname].researched) {
        project.addScience(u.research[pname].scienceGained, u);
      } else {
        project.reset();
      }
    });

    const currentName = u.currentResearchProject;
    if (currentName != null) {
        this.currentProject = this.allProjects[currentName];
    } else {
        this.currentProject = null;
    }
  }


}
