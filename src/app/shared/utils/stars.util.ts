/**
 * Returns an array of `length` items used to drive @for star rendering.
 * Lives here so it is never duplicated across components.
 *
 * @example
 *   @for (star of starsArray(pattern.rating); track $index) { <span>★</span> }
 */
export function starsArray(rating: number): number[] {
  return Array.from({ length: rating }, (_, i) => i);
}
