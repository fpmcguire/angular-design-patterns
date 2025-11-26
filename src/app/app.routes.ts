// src/app/app.routes.ts

import { Routes } from '@angular/router';

import { PatternsListComponent } from './patterns/patterns-list.component';
import { PatternDetailComponent } from './patterns/pattern-detail.component';

import { ClassicPatternsListComponent } from './classic-patterns/classic-patterns-list.component';
import { ClassicPatternDetailComponent } from './classic-patterns/classic-pattern-detail.component';

import { SolidPrinciplesListComponent } from './solid/solid-principles-list.component';
import { SolidPrincipleDetailComponent } from './solid/solid-principle-detail.component';

import { GraspPatternsListComponent } from './grasp/grasp-patterns-list.component';
import { GraspPatternDetailComponent } from './grasp/grasp-pattern-detail.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'patterns'
  },
  // Angular-specific patterns
  {
    path: 'patterns',
    component: PatternsListComponent
  },
  {
    path: 'patterns/:id',
    component: PatternDetailComponent
  },
  // Classic GoF patterns
  {
    path: 'classic',
    component: ClassicPatternsListComponent
  },
  {
    path: 'classic/:id',
    component: ClassicPatternDetailComponent
  },
  // S.O.L.I.D.
  {
    path: 'solid',
    component: SolidPrinciplesListComponent
  },
  {
    path: 'solid/:id',
    component: SolidPrincipleDetailComponent
  },
  // GRASP
  {
    path: 'grasp',
    component: GraspPatternsListComponent
  },
  {
    path: 'grasp/:id',
    component: GraspPatternDetailComponent
  },
  {
    path: '**',
    redirectTo: 'patterns'
  }
];
