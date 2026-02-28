import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ARCHITECTURE_EXAMPLES } from './architecture.data';

/**
 * Architecture page component.
 *
 * DESIGN NOTES:
 * - Template is 133+ lines → separate .html/.scss files for readability
 * - Code examples are static, reusable content → extracted to architecture.data.ts
 * - This separation allows future migration to markdown or backend API
 */
@Component({
  selector: 'app-architecture-page',
  standalone: true,
  imports: [],
  templateUrl: './architecture-page.component.html',
  styleUrl: './architecture-page.component.scss',
})
export class ArchitecturePageComponent {
  private readonly viewport = inject(ViewportScroller);

  // Code examples imported from separate data file (see architecture.data.ts)
  readonly codeFolderLayout = ARCHITECTURE_EXAMPLES.codeFolderLayout;
  readonly codeFeatureStructure = ARCHITECTURE_EXAMPLES.codeFeatureStructure;
  readonly codeFacade = ARCHITECTURE_EXAMPLES.codeFacade;
  readonly codeRepository = ARCHITECTURE_EXAMPLES.codeRepository;
  readonly codeRoutes = ARCHITECTURE_EXAMPLES.codeRoutes;
  readonly codeAuthInterceptor = ARCHITECTURE_EXAMPLES.codeAuthInterceptor;
  readonly projectStructure = ARCHITECTURE_EXAMPLES.projectStructure;

  onTocClick(event: Event, fragment: string): void {
    event.preventDefault();
    if (typeof document !== 'undefined') {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
