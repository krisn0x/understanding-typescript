import { Component } from "./component.js";
import { Project } from "../models/project.js";
import { Draggable } from "../contracts.js";
import { autobind } from "../util.js";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {

  get people(): string {
    if (this.project.people == 1) {
      return '1 person';
    }
    return `${this.project.people} people`;
  }

  constructor(
    private hostId: string,
    private project: Project
  ) {
    super('single-project', hostId, false, project.id);

    this.configure();
    this.renderContent();
  }

  protected configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  protected renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.people + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }
  @autobind
  dragEndHandler(event: DragEvent): void {
    console.log('Drag end');
    
  }
}