import { autobind } from "../util.js";

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {

  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.querySelector(`#${templateId}`) as HTMLTemplateElement;
    this.hostElement = document.querySelector(`#${hostElementId}`) as T;
    const templateFragment = document.importNode(this.templateElement.content, true) as DocumentFragment;
    this.element = templateFragment.firstElementChild as U;

    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  @autobind
  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
  }

  protected abstract configure(): void;
  protected abstract renderContent(): void;
}