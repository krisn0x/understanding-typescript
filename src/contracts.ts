export interface Listener<T> {
  (items: T[]): void;
}

export enum ProjectStatus {
  Active, Finished
}

export interface Validatable {
  value: string | number,
  required?: boolean,
  maxLength?: number,
  minLength?: number,
  min?: number,
  max?: number
}

export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DropTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}