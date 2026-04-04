import { greet } from '@playground/utils';

export function normalizeName(value: string): string {
  return value || 'World';
}

export function createGreetingMessage(name: string): string {
  return greet(normalizeName(name));
}
