import { Routes } from '@angular/router';
import { PatternsListComponent } from './patterns/patterns-list.component';
import { PatternDetailComponent } from './patterns/pattern-detail.component';
import { ClassicPatternsListComponent } from './classic-patterns/classic-patterns-list.component';
import { ClassicPatternDetailComponent } from './classic-patterns/classic-patterns-detail.component';

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
    path: 'classic',
    component: ClassicPatternsListComponent
  },
  {
    path: 'classic/:id',
    component: ClassicPatternDetailComponent
  },
  {
    path: '**',
    redirectTo: 'patterns'
  }
];
