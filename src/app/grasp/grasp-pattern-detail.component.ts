import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GRASP_PATTERNS, GraspPattern } from './grasp-patterns.data';

@Component({
  selector: 'app-grasp-pattern-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ng-container *ngIf="pattern(); else notFound">
      <a routerLink="/grasp" class="back-link">← Back to GRASP</a>

      <header class="detail-header">
        <h2>{{ pattern()!.name }}</h2>
        <span class="detail-header__category">{{ pattern()!.category }}</span>
      </header>

      <p class="detail-description">
        {{ pattern()!.description }}
      </p>

      <section *ngIf="pattern()!.exampleTs || pattern()!.exampleHtml" class="detail-examples">
        <h3>Angular / TypeScript Example</h3>

        <div *ngIf="pattern()!.exampleTs" class="code-block">
          <div class="code-block__label">TypeScript</div>
          <pre><code>{{ pattern()!.exampleTs }}</code></pre>
        </div>

        <div *ngIf="pattern()!.exampleHtml" class="code-block">
          <div class="code-block__label">Template</div>
          <pre><code>{{ pattern()!.exampleHtml }}</code></pre>
        </div>
      </section>
    </ng-container>

    <ng-template #notFound>
      <a routerLink="/grasp" class="back-link">← Back to GRASP</a>
      <p>Pattern not found.</p>
    </ng-template>
  `,
  styles: [`
    .back-link {
      display: inline-block;
      margin-bottom: 0.75rem;
      font-size: 0.85rem;
      color: #4b5563;
      text-decoration: none;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .detail-header {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }
    .detail-header h2 {
      margin: 0;
      font-size: 1.5rem;
    }
    .detail-header__category {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #9ca3af;
    }
    .detail-description {
      margin: 0 0 1.25rem;
      max-width: 48rem;
      color: #4b5563;
      line-height: 1.4;
    }
    .detail-examples h3 {
      margin-top: 0;
      font-size: 1.1rem;
    }
    .code-block {
      margin-bottom: 0.75rem;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
      background: #111827;
      color: #e5e7eb;
      overflow: auto;
      box-shadow: 0 1px 4px rgba(15,23,42,0.4);
    }
    .code-block__label {
      font-size: 0.75rem;
      padding: 0.35rem 0.75rem;
      border-bottom: 1px solid rgba(55,65,81,0.9);
      background: #020617;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    pre {
      margin: 0;
      padding: 0.7rem 0.9rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.78rem;
      line-height: 1.5;
      white-space: pre-wrap;
    }
  `]
})
export class GraspPatternDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly patternSignal = signal<GraspPattern | null>(null);
  readonly pattern = computed(() => this.patternSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = GRASP_PATTERNS.find(p => p.id === id) ?? null;
    this.patternSignal.set(found);
  }
}
