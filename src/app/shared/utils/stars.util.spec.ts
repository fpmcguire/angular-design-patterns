import { describe, it, expect } from 'vitest';
import { starsArray } from './stars.util';

describe('starsArray', () => {
  it('should return empty array for rating 0', () => {
    const result = starsArray(0);
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it('should return array with correct length for rating 3', () => {
    const result = starsArray(3);
    expect(result.length).toBe(3);
    expect(result).toEqual([0, 1, 2]);
  });

  it('should return array with correct length for rating 5', () => {
    const result = starsArray(5);
    expect(result.length).toBe(5);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('should return array with indices starting from 0', () => {
    const result = starsArray(4);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(2);
    expect(result[3]).toBe(3);
  });
});
