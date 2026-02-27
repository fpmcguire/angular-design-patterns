import { PatternItem } from '../../shared/models/pattern-item.model';
import classicJson from './classic-patterns.json';

export const CLASSIC_PATTERNS: PatternItem[] = classicJson.map(p => ({
  ...p,
  rating: p.rating as 1 | 2 | 3 | 4 | 5,
  exampleTs: p.exampleTs?.join('\n'),
}));
