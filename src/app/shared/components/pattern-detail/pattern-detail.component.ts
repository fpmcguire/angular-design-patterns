import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatternItem } from '../../models/pattern-item.model';
import { starsArray } from '../../utils/stars.util';

@Component({
  selector: 'app-pattern-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pattern-detail.component.html',
  styleUrl: './pattern-detail.component.scss',
})
export class PatternDetailComponent {
  // ── Required inputs ────────────────────────────────────────────────────────
  readonly item      = input.required<PatternItem | null>();
  readonly backRoute = input.required<string>();
  readonly backLabel = input.required<string>();

  // ── Optional inputs ────────────────────────────────────────────────────────
  /** Hint shown below code blocks when examples are present. */
  readonly hint = input<string>();
  /** Hint shown when no code examples have been added yet. */
  readonly noExampleHint = input<string>();

  // ── Utilities ──────────────────────────────────────────────────────────────
  readonly starsArray = starsArray;
}
