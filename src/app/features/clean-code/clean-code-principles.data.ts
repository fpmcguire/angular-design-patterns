export type CleanCodeCategory =
  | 'Duplication'
  | 'Simplicity'
  | 'Over-Engineering'
  | 'Coupling'
  | 'Immutability';

export interface CleanCodePrinciple {
  id: string;
  name: string;
  category: CleanCodeCategory;
  shortDescription: string;
  description: string;
  exampleTs?: string;
  exampleHtml?: string;
}

import cleanCodePrinciples from './clean-code-principles.json';

export const CLEAN_CODE_PRINCIPLES = cleanCodePrinciples.map(principle => ({
  ...principle,
  exampleTs: principle.exampleTs?.join('\n')
}));
