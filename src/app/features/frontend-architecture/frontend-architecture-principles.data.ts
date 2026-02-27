import { PatternItem } from '../../shared/models/pattern-item.model';
import frontendArchJson from './frontend-architecture-principles.json';

export const FRONTEND_ARCH_PRINCIPLES: PatternItem[] = frontendArchJson.map(p => ({
  ...p,
  exampleTs: p.exampleTs?.join('\n'),
}));
