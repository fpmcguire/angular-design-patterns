import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PATTERNS, Pattern } from './patterns.data';

@Component({
  selector: 'app-pattern-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (pattern()) {
      <a routerLink="/patterns" class="back-link">← Back to all patterns</a>

      <header class="detail-header">
        <h2>{{ pattern()!.name }}</h2>
        <span class="detail-header__category">{{ pattern()!.category }}</span>
      </header>

      <p class="detail-description">
        {{ pattern()!.description }}
      </p>

      @if (pattern()!.exampleTs || pattern()!.exampleHtml) {
        <section class="detail-examples">
          <h3>Example</h3>

          @if (pattern()!.exampleTs) {
            <div class="code-block">
              <div class="code-block__label">TypeScript</div>
              <pre><code>{{ pattern()!.exampleTs }}</code></pre>
            </div>
          }

          @if (pattern()!.exampleHtml) {
            <div class="code-block">
              <div class="code-block__label">Template</div>
              <pre><code>{{ pattern()!.exampleHtml }}</code></pre>
            </div>
          }

          <p class="hint">
            You can copy this snippet into a standalone component, directive, or service
            to experiment with the pattern in isolation.
          </p>
        </section>
      } @else {
        <section class="detail-examples">
          <p class="hint">
            Example snippet not yet added in this catalog.
            You can paste your own code here via <code>patterns.data.ts</code>.
          </p>
        </section>
      }
    } @else {
      <a routerLink="/patterns" class="back-link">← Back to all patterns</a>
      <p>Pattern not found.</p>
    }
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

    .hint {
      margin-top: 0.25rem;
      font-size: 0.8rem;
      color: #6b7280;
    }
  `]
})
export class PatternDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly patternSignal = signal<Pattern | null>(null);

  readonly pattern = computed(() => this.patternSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = PATTERNS.find(p => p.id === id) ?? null;
    this.patternSignal.set(found);
  }
}
