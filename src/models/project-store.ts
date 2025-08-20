import { Project } from "./project.js";
import { Listener, ProjectStatus } from "../contracts.js";

// singleton pattern
class ProjectStore {
  private projects: Project[] = [];
  private static instance: ProjectStore;
  private listeners: Listener<Project>[] = [];

  static getInstance(): ProjectStore {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectStore();
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
  
export const projectStore = ProjectStore.getInstance();