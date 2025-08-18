import { Component } from "./component.js";
import { projectStore } from "../models/project-store.js";
import { Validatable } from "../contracts.js";
import { autobind, validate } from "../util.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input')
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
  
    this.configure();
  }

  @autobind
  protected configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void { }

  private getUserInput(): [string, string, number] | void {
    const inputs: Validatable[] = [
      // max/min values should be in a CONSTANTS file in a larger project
      { value: this.titleInputElement.value, required: true, minLength: 3, maxLength: 20 },
      { value: this.descriptionInputElement.value, required: false, minLength: 3, maxLength: 20 },
      { value: +this.peopleInputElement.value, required: true, min: 1, max: 10 }
    ]
    for (let i = 0; i < inputs.length; i++) {
      if (!validate(inputs[i])) {
        alert('Invalid Data!')
        return;
      }
    }
    return [
      this.titleInputElement.value,
      this.descriptionInputElement.value,
      +this.peopleInputElement.value
    ];
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectStore.addProject(title, desc, people);
      console.log('added: ' + title, desc, people);
    }
    this.clearInputs();
  }

  private clearInputs() {

      this.titleInputElement.value =
      this.descriptionInputElement.value =
      this.peopleInputElement.value = '';
  }
}