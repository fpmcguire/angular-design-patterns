import { PatternItem } from '../../shared/models/pattern-item.model';
import reactiveJson from './reactive-principles.json';

export const REACTIVE_PRINCIPLES: PatternItem[] = reactiveJson.map(p => ({
  ...p,
  exampleTs: p.exampleTs?.join('\n'),
  exampleHtml: p.exampleHtml?.join('\n'),
}));
