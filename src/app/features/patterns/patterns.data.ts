import { PatternItem } from '../../shared/models/pattern-item.model';
import patternsJson from './patterns.json';

export const PATTERNS: PatternItem[] = patternsJson.map(p => ({
  ...p,
  exampleTs:   p.exampleTs?.join('\n'),
  exampleHtml: p.exampleHtml?.join('\n'),
}));
