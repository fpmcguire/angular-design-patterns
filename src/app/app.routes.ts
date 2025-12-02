import { Routes } from '@angular/router';

// existing imports...
import { PatternsListComponent } from './patterns/patterns-list.component';
import { PatternDetailComponent } from './patterns/pattern-detail.component';
import { ClassicPatternsListComponent } from './classic-patterns/classic-patterns-list.component';
import { ClassicPatternDetailComponent } from './classic-patterns/classic-pattern-detail.component';
import { SolidPrinciplesListComponent } from './solid/solid-principles-list.component';
import { SolidPrincipleDetailComponent } from './solid/solid-principle-detail.component';
import { GraspPatternsListComponent } from './grasp/grasp-patterns-list.component';
import { GraspPatternDetailComponent } from './grasp/grasp-pattern-detail.component';
import { CleanCodePrinciplesListComponent } from './clean-code/clean-code-principles-list.component';
import { CleanCodePrincipleDetailComponent } from './clean-code/clean-code-principle-detail.component';
import { FrontendArchitecturePrinciplesListComponent } from './frontend-architecture/frontend-architecture-principles-list.component';
import { FrontendArchitecturePrincipleDetailComponent } from './frontend-architecture/frontend-architecture-principle-detail.component';
import { ReactivePrinciplesListComponent } from './reactive-principles/reactive-principles-list.component';
import { ReactivePrincipleDetailComponent } from './reactive-principles/reactive-principle-detail.component';
import { ArchitecturePageComponent } from './architecture/architecture-page.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'patterns' },

  { path: 'patterns', component: PatternsListComponent },
  { path: 'patterns/:id', component: PatternDetailComponent },

  { path: 'classic', component: ClassicPatternsListComponent },
  { path: 'classic/:id', component: ClassicPatternDetailComponent },

  { path: 'solid', component: SolidPrinciplesListComponent },
  { path: 'solid/:id', component: SolidPrincipleDetailComponent },

  { path: 'grasp', component: GraspPatternsListComponent },
  { path: 'grasp/:id', component: GraspPatternDetailComponent },

  { path: 'clean-code', component: CleanCodePrinciplesListComponent },
  { path: 'clean-code/:id', component: CleanCodePrincipleDetailComponent },

  { path: 'frontend-architecture', component: FrontendArchitecturePrinciplesListComponent },
  { path: 'frontend-architecture/:id', component: FrontendArchitecturePrincipleDetailComponent },

  { path: 'reactive', component: ReactivePrinciplesListComponent },
  { path: 'reactive/:id', component: ReactivePrincipleDetailComponent },

  { path: 'architecture', component: ArchitecturePageComponent },

  // TODO: add routes for reactive-principles, testing-principles, ux-api, maintainability
  // { path: 'testing', ... }
  // { path: 'ux-api', ... }
  // { path: 'maintainability', ... }

  { path: '**', redirectTo: 'patterns' }
];
