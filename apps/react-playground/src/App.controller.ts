import { greet } from '@playground/utils';

export function normalizeName(value: string): string {
  const normalizedValue = value.trim();

  return normalizedValue || 'World';
}

export function createGreetingMessage(name: string): string {
  return greet(normalizeName(name));
}
