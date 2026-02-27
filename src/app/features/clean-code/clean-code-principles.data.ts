import { PatternItem } from '../../shared/models/pattern-item.model';
import cleanCodeJson from './clean-code-principles.json';

export const CLEAN_CODE_PRINCIPLES: PatternItem[] = cleanCodeJson.map(p => ({
  ...p,
  exampleTs: p.exampleTs?.join('\n'),
  exampleHtml: p.exampleHtml?.join('\n'),
}));
