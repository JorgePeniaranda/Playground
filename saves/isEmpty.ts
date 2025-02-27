/**
 * Checks if a value is neither `null` nor `undefined`.
 * @param value - The value to check.
 * @returns `true` if the value is neither `null` nor `undefined`, otherwise `false`.
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== null;
}

/**
 * Checks if a value is either `null` or `undefined`.
 * @param value - The value to check.
 * @returns `true` if the value is `null` or `undefined`, otherwise `false`.
 */
export function isNullOrUndefined<T>(value: T | undefined | null): value is undefined | null {
  return value == null;
}
