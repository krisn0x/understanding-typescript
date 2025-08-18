import { Project } from "./models/project.js";
import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

let projectInput = new ProjectInput;
let activeProjects = new ProjectList('active');
let finishedProjects = new ProjectList('finished');