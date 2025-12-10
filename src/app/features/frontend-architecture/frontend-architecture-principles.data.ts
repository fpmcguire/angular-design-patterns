export type FrontendArchCategory =
  | 'Data Flow'
  | 'State Management'
  | 'Boundaries';

export interface FrontendArchPrinciple {
  id: string;
  name: string;
  category: FrontendArchCategory;
  shortDescription: string;
  description: string;
  exampleTs?: string;
  exampleHtml?: string;
}


import frontendArchPrinciples from './frontend-architecture-principles.json';

export const FRONTEND_ARCH_PRINCIPLES = frontendArchPrinciples.map(principle => ({
  ...principle,
  exampleTs: principle.exampleTs?.join('\n')
}));
