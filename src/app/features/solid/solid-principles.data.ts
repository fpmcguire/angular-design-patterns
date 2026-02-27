import { PatternItem } from '../../shared/models/pattern-item.model';
import solidJson from './solid-principles.json';

export const SOLID_PRINCIPLES: PatternItem[] = solidJson.map(p => ({
  ...p,
  exampleTs: p.exampleTs?.join('\n'),
}));
