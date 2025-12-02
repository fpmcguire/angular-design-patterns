import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FRONTEND_ARCH_PRINCIPLES,
  FrontendArchPrinciple
} from './frontend-architecture-principles.data';

@Component({
  selector: 'app-frontend-architecture-principle-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (principle()) {
      <a routerLink="/frontend-architecture" class="back-link">← Back to Frontend Architecture</a>

      <header class="detail-header">
        <h2>{{ principle()!.name }}</h2>
        <span class="detail-header__category">{{ principle()!.category }}</span>
      </header>

      <p class="detail-description">
        {{ principle()!.description }}
      </p>

      @if (principle()!.exampleTs || principle()!.exampleHtml) {
        <section class="detail-examples">
          <h3>Angular / TypeScript Example</h3>

          @if (principle()!.exampleTs) {
            <div class="code-block">
              <div class="code-block__label">TypeScript</div>
              <pre><code>{{ principle()!.exampleTs }}</code></pre>
            </div>
          }

          @if (principle()!.exampleHtml) {
            <div class="code-block">
              <div class="code-block__label">Template</div>
              <pre><code>{{ principle()!.exampleHtml }}</code></pre>
            </div>
          }
        </section>
      }
    } @else {
      <a routerLink="/frontend-architecture" class="back-link">← Back to Frontend Architecture</a>
      <p>Principle not found.</p>
    }
  `,
  styles: [/* same styles as other detail components */`
    .back-link { display: inline-block; margin-bottom: .75rem; font-size: .85rem; color: #4b5563; text-decoration: none; }
    .back-link:hover { text-decoration: underline; }
    .detail-header { display: flex; flex-wrap: wrap; align-items: baseline; gap: .5rem; margin-bottom: .25rem; }
    .detail-header h2 { margin: 0; font-size: 1.5rem; }
    .detail-header__category { font-size: .75rem; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; }
    .detail-description { margin: 0 0 1.25rem; max-width: 48rem; color: #4b5563; line-height: 1.4; }
    .detail-examples h3 { margin-top: 0; font-size: 1.1rem; }
    .code-block { margin-bottom: .75rem; border-radius: .75rem; border: 1px solid #e5e7eb; background: #111827; color: #e5e7eb; overflow: auto; box-shadow: 0 1px 4px rgba(15,23,42,.4); }
    .code-block__label { font-size: .75rem; padding: .35rem .75rem; border-bottom: 1px solid rgba(55,65,81,.9); background: #020617; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; }
    pre { margin: 0; padding: .7rem .9rem; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: .78rem; line-height: 1.5; white-space: pre-wrap; }
  `]
})
export class FrontendArchitecturePrincipleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly principleSignal = signal<FrontendArchPrinciple | null>(null);
  readonly principle = computed(() => this.principleSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = FRONTEND_ARCH_PRINCIPLES.find(p => p.id === id) ?? null;
    this.principleSignal.set(found);
  }
}
