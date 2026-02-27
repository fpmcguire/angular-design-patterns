import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'patterns' },

  {
    path: 'patterns',
    loadComponent: () =>
      import('./features/patterns/patterns-list.component').then(m => m.PatternsListComponent),
  },
  {
    path: 'patterns/:id',
    loadComponent: () =>
      import('./features/patterns/pattern-detail.component').then(m => m.PatternsDetailPageComponent),
  },

  {
    path: 'classic',
    loadComponent: () =>
      import('./features/classic-patterns/classic-patterns-list.component').then(
        m => m.ClassicPatternsListComponent
      ),
  },
  {
    path: 'classic/:id',
    loadComponent: () =>
      import('./features/classic-patterns/classic-pattern-detail.component').then(
        m => m.ClassicPatternDetailComponent
      ),
  },

  {
    path: 'solid',
    loadComponent: () =>
      import('./features/solid/solid-principles-list.component').then(
        m => m.SolidPrinciplesListComponent
      ),
  },
  {
    path: 'solid/:id',
    loadComponent: () =>
      import('./features/solid/solid-principle-detail.component').then(
        m => m.SolidPrincipleDetailComponent
      ),
  },

  {
    path: 'grasp',
    loadComponent: () =>
      import('./features/grasp/grasp-patterns-list.component').then(
        m => m.GraspPatternsListComponent
      ),
  },
  {
    path: 'grasp/:id',
    loadComponent: () =>
      import('./features/grasp/grasp-pattern-detail.component').then(
        m => m.GraspPatternDetailComponent
      ),
  },

  {
    path: 'clean-code',
    loadComponent: () =>
      import('./features/clean-code/clean-code-principles-list.component').then(
        m => m.CleanCodePrinciplesListComponent
      ),
  },
  {
    path: 'clean-code/:id',
    loadComponent: () =>
      import('./features/clean-code/clean-code-principle-detail.component').then(
        m => m.CleanCodePrincipleDetailComponent
      ),
  },

  {
    path: 'frontend-architecture',
    loadComponent: () =>
      import(
        './features/frontend-architecture/frontend-architecture-principles-list.component'
      ).then(m => m.FrontendArchitecturePrinciplesListComponent),
  },
  {
    path: 'frontend-architecture/:id',
    loadComponent: () =>
      import(
        './features/frontend-architecture/frontend-architecture-principle-detail.component'
      ).then(m => m.FrontendArchitecturePrincipleDetailComponent),
  },

  {
    path: 'reactive',
    loadComponent: () =>
      import('./features/reactive-principles/reactive-principles-list.component').then(
        m => m.ReactivePrinciplesListComponent
      ),
  },
  {
    path: 'reactive/:id',
    loadComponent: () =>
      import('./features/reactive-principles/reactive-principle-detail.component').then(
        m => m.ReactivePrincipleDetailComponent
      ),
  },

  {
    path: 'architecture',
    loadComponent: () =>
      import('./features/architecture/architecture-page.component').then(
        m => m.ArchitecturePageComponent
      ),
  },

  { path: '**', redirectTo: 'patterns' },
];
