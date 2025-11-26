import { Routes } from '@angular/router';
import { PatternsListComponent } from './patterns/patterns-list.component';
import { PatternDetailComponent } from './patterns/pattern-detail.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'patterns'
  },
  {
    path: 'patterns',
    component: PatternsListComponent
  },
  {
    path: 'patterns/:id',
    component: PatternDetailComponent
  },
  {
    path: '**',
    redirectTo: 'patterns'
  }
];
