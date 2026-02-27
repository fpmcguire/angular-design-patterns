import { PatternItem } from '../../shared/models/pattern-item.model';
import graspJson from './grasp-patterns.json';

export const GRASP_PATTERNS: PatternItem[] = graspJson.map(p => ({
  ...p,
  exampleTs: p.exampleTs?.join('\n'),
}));
