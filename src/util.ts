import { Validatable } from "./contracts";

//autobind decorator
export function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn
    }
  }
  return adjustedDescriptor;
}

export function validate(input: Validatable): boolean {
  let isValid = true;
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }
  if (input.minLength && typeof input.value === 'string') {
    isValid = isValid && input.value.length >= input.minLength;
  }
  if (input.maxLength && typeof input.value === 'string') {
    isValid = isValid && input.value.length <= input.maxLength;
  }
  if (input.min && typeof input.value === 'number') {
    isValid = isValid && input.value >= input.min;
  }
  if (input.max && typeof input.value === 'number') {
    isValid = isValid && input.value <= input.max;
  }
  return isValid;
}