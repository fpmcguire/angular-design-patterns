export type ClassicPatternCategory = 'Creational' | 'Structural' | 'Behavioral';

export interface ClassicPattern {
  id: string;
  name: string;
  category: ClassicPatternCategory;
  shortDescription: string;
  description: string;
  rating?: 1 | 2 | 3 | 4 | 5; // popularity in real-world Angular
  exampleTs?: string;
  exampleHtml?: string;
}

import classicPatterns from './classic-patterns.json';

export const CLASSIC_PATTERNS = classicPatterns.map(pattern => ({
  ...pattern,
  exampleTs: pattern.exampleTs?.join('\n')
}));
