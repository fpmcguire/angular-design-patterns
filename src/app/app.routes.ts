import { Routes } from '@angular/router';

// existing imports...
import { PatternsListComponent } from './features/patterns/patterns-list.component';
import { PatternDetailComponent } from './features/patterns/pattern-detail.component';
import { ClassicPatternsListComponent } from './features/classic-patterns/classic-patterns-list.component';
import { ClassicPatternDetailComponent } from './features/classic-patterns/classic-pattern-detail.component';
import { SolidPrinciplesListComponent } from './features/solid/solid-principles-list.component';
import { SolidPrincipleDetailComponent } from './features/solid/solid-principle-detail.component';
import { GraspPatternsListComponent } from './features/grasp/grasp-patterns-list.component';
import { GraspPatternDetailComponent } from './features/grasp/grasp-pattern-detail.component';
import { CleanCodePrinciplesListComponent } from './features/clean-code/clean-code-principles-list.component';
import { CleanCodePrincipleDetailComponent } from './features/clean-code/clean-code-principle-detail.component';
import { FrontendArchitecturePrinciplesListComponent } from './features/frontend-architecture/frontend-architecture-principles-list.component';
import { FrontendArchitecturePrincipleDetailComponent } from './features/frontend-architecture/frontend-architecture-principle-detail.component';
import { ReactivePrinciplesListComponent } from './features/reactive-principles/reactive-principles-list.component';
import { ReactivePrincipleDetailComponent } from './features/reactive-principles/reactive-principle-detail.component';
import { ArchitecturePageComponent } from './features/architecture/architecture-page.component';

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

  { path: '**', redirectTo: 'patterns' }
];
