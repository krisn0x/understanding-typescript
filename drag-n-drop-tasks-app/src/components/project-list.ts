import { Component } from "./component.js";
import { ProjectItem } from "../components/project-item.js";
import { Project } from "../models/project.js";
import { projectStore } from "../state/project-state.js";
import { DropTarget } from "../models/dragdrop.js";
import { autobind } from "../decorators/autobind.js";

export class ProjectList
  extends Component<HTMLDivElement, HTMLUListElement>
  implements DropTarget {

  private assignedProjects: Project[] = [];
  private listElementId: string = `${this.type}-projects-list`;

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);


    this.configure();
    this.renderContent();
  }

  protected configure(): void {

    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);

    // Create listener for each ProjectList and add it to projectStore
    // Fire to update list of assigned projects in the ProjectList
    projectStore.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjectItems();
    });
  }

  renderContent() {
    this.element.querySelector('ul')!.id = this.listElementId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private renderProjectItems() {
    const listElement = document.getElementById(this.listElementId)! as HTMLUListElement;
    listElement.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer &&
      event.dataTransfer.types.indexOf('text/plain') != -1) {
      event.preventDefault();
      this.element.classList.add('droppable');
    }
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    this.element.classList.remove('droppable');
  }

  @autobind
  dragEndHandler(event: DragEvent) {
    this.element.classList.remove('droppable');
  }

  @autobind
  dropHandler(event: DragEvent): void {
    projectStore.moveProject(
      event.dataTransfer!.getData('text/plain'),
      this.type == 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    )
    this.element.classList.remove('droppable');
  }
}