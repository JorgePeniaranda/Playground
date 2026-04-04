export function compactArray<T>(array: (T | null | undefined)[] | undefined | null): T[] {
  return array?.filter((item) => item !== null && item !== undefined) ?? [];
}
