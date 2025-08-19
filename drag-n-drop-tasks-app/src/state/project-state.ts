import { Project, ProjectStatus } from "../models/project.js";

export interface Listener<T> {
  (items: T[]): void;
}

// singleton pattern
class ProjectState {
  private projects: Project[] = [];
  private static instance: ProjectState;
  private listeners: Listener<Project>[] = [];

  static getInstance(): ProjectState {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  private constructor() {
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.runListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.runListeners();
    }
  }

  addListener(listenerFn: Listener<Project>) {
    this.listeners.push(listenerFn);
  }

  private runListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}
  
export const projectStore = ProjectState.getInstance();