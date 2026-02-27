import { Component } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { CLEAN_CODE_PRINCIPLES } from './clean-code-principles.data';

@Component({
  selector: 'app-clean-code-principles-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #fb7185' },
  template: `
    <app-pattern-list
      [items]="items"
      title="Clean Code Principles"
      intro="Everyday principles for writing clear, maintainable Angular & TypeScript code (DRY, KISS, YAGNI, and more)."
      routeBase="clean-code"
    />
  `,
})
export class CleanCodePrinciplesListComponent {
  readonly items = CLEAN_CODE_PRINCIPLES;
}
