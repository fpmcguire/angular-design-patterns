// src/app/architecture/architecture-page.component.ts

import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-architecture-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <header class="page-header">
        <h2>Angular Software Architecture</h2>
        <p>
          A practical guide to structuring medium–large Angular applications:
          layers, feature boundaries, state management, and cross-cutting concerns.
        </p>
      </header>

      <nav class="toc">
        <h3>On this page</h3>
        <ul>
          <li>
            <a href="" (click)="onTocClick($event, 'goals')">
              Architecture goals
            </a>
          </li>
          <li>
            <a href="" (click)="onTocClick($event, 'layers')">
              High-level layers
            </a>
          </li>
          <li>
            <a href="" (click)="onTocClick($event, 'structure')">
              Project &amp; folder structure
            </a>
          </li>
          <li>
            <a href="" (click)="onTocClick($event, 'state')">
              State management strategy
            </a>
          </li>
          <li>
            <a href="" (click)="onTocClick($event, 'data-api')">
              Data &amp; API boundaries
            </a>
          </li>
          <li>
            <a href="" (click)="onTocClick($event, 'routing')">
              Routing &amp; feature modules
            </a>
          </li>
          <li>
            <a href="" (click)="onTocClick($event, 'cross-cutting')">
              Cross-cutting concerns
            </a>
          </li>
        </ul>
      </nav>

      <section id="goals">
        <h3>Architecture goals</h3>
        <p>
          Good Angular architecture makes it easy to add features, fix bugs, and onboard new
          developers without the codebase turning into spaghetti.
        </p>
        <ul>
          <li>👥 <strong>Team-scalable</strong> – multiple people can work without merge pain.</li>
          <li>🧩 <strong>Modular</strong> – features are isolated and have clear boundaries.</li>
          <li>🔄 <strong>Change-friendly</strong> – you can swap APIs, redesign UIs, or change state management.</li>
          <li>🚀 <strong>Performant</strong> – lazy loading, OnPush, and smart state usage.</li>
        </ul>
      </section>

      <section id="layers">
        <h3>High-level layers</h3>
        <p>One common layering for Angular apps:</p>
        <ul>
          <li><strong>App Shell</strong> – root component, global layout, top-level routing.</li>
          <li><strong>Features</strong> – each business area (Orders, Auth, Dashboard).</li>
          <li><strong>Shared UI</strong> – reusable presentational components (buttons, tables, modals).</li>
          <li><strong>Infrastructure</strong> – API services, adapters, logging, analytics.</li>
        </ul>

        <div class="code-block">
          <div class="code-block__label">Example: conceptual folder layout</div>
          <pre><code [innerText]="codeFolderLayout"></code></pre>
        </div>
      </section>

      <section id="structure">
        <h3>Project &amp; folder structure</h3>
        <p>
          Prefer <strong>feature-based</strong> structure over technical layers.
        </p>

        <div class="code-block">
          <div class="code-block__label">Feature-based structure</div>
          <pre><code [innerText]="codeFeatureStructure"></code></pre>
        </div>
      </section>

      <section id="state">
        <h3>State management strategy</h3>
        <p>
          Start with simple component + service state. Introduce NgRx or Component Store only when scale requires it.
        </p>

        <ul>
          <li><strong>Local UI state</strong> – belongs inside components.</li>
          <li><strong>Feature state</strong> – inside feature-specific stores/services.</li>
          <li><strong>Global state</strong> – auth, user profile, layout settings.</li>
        </ul>

        <div class="code-block">
          <div class="code-block__label">Example: facade pattern</div>
          <pre><code [innerText]="codeFacade"></code></pre>
        </div>
      </section>

      <section id="data-api">
        <h3>Data &amp; API boundaries</h3>
        <p>
          Map backend models to frontend domain models in a <strong>data-access/repository</strong> layer.
        </p>

        <div class="code-block">
          <div class="code-block__label">Repository + adapter</div>
          <pre><code [innerText]="codeRepository"></code></pre>
        </div>
      </section>

      <section id="routing">
        <h3>Routing &amp; feature modules</h3>
        <p>Use one route per feature and lazy-load them.</p>

        <div class="code-block">
          <div class="code-block__label">Standalone lazy-loaded feature route</div>
          <pre><code [innerText]="codeRoutes"></code></pre>
        </div>
      </section>

      <section id="cross-cutting">
        <h3>Cross-cutting concerns</h3>
        <p>
          Handle auth, logging, and global error handling in core services and interceptors.
        </p>

        <div class="code-block">
          <div class="code-block__label">Auth interceptor</div>
          <pre><code [innerText]="codeAuthInterceptor"></code></pre>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .page {
      max-width: 900px;
      margin: 0 auto;
    }

    .page-header h2 {
      margin: 0 0 .4rem;
      font-size: 1.6rem;
    }

    .page-header p {
      margin: 0 0 1rem;
      color: #4b5563;
    }

    .toc {
      margin-bottom: 1.25rem;
      padding: .75rem 1rem;
      border-radius: .75rem;
      border: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .toc h3 {
      margin: 0 0 .4rem;
      font-size: .95rem;
    }

    .toc ul {
      margin: 0;
      padding-left: 1.1rem;
      font-size: .85rem;
      color: #374151;
    }

    .toc a {
      text-decoration: none;
      color: #2563eb;
    }

    .toc a:hover {
      text-decoration: underline;
    }

    section {
      margin-bottom: 1.5rem;
    }

    section h3 {
      margin: 0 0 .3rem;
      font-size: 1.1rem;
    }

    section p {
      margin: 0 0 .4rem;
      color: #374151;
    }

    .code-block {
      margin-top: .5rem;
      border-radius: .75rem;
      border: 1px solid #e5e7eb;
      background: #111827;
      color: #e5e7eb;
      overflow: auto;
      box-shadow: 0 1px 4px rgba(15,23,42,.4);
    }

    .code-block__label {
      font-size: .75rem;
      padding: .35rem .75rem;
      border-bottom: 1px solid rgba(55,65,81,.9);
      background: #020617;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: .06em;
    }

    pre {
      margin: 0;
      padding: .7rem .9rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: .78rem;
      line-height: 1.5;
      white-space: pre-wrap;
    }
  `]
})
export class ArchitecturePageComponent {
  constructor(private readonly viewport: ViewportScroller) { }

  onTocClick(event: Event, fragment: string): void {
    event.preventDefault();

    // Use direct DOM lookup; works even inside nested scroll containers
    if (typeof document !== 'undefined') {
      const el = document.getElementById(fragment);
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',  // or 'auto' if you want instant jump
          block: 'start'
        });
      }
    }
  }

  readonly codeFolderLayout = `
src/
  app/
    core/               # app shell, layout, global providers
    features/
      orders/
      auth/
      dashboard/
    shared/
      ui/
      data-access/
      util/
`.trim();

  readonly codeFeatureStructure = `
features/
  orders/
    orders-page.component.ts
    orders-routing.ts
    orders.facade.ts
    orders.store.ts
    orders.api.ts
  auth/
    login-page.component.ts
    auth.guard.ts
    auth.api.ts
`.trim();

  readonly codeFacade = `
@Injectable({ providedIn: 'root' })
export class OrdersFacade {
  readonly orders$ = this.store.select(selectOrders);
  readonly loading$ = this.store.select(selectOrdersLoading);

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(OrdersActions.load());
  }
}
`.trim();

  readonly codeRepository = `
@Injectable({ providedIn: 'root' })
export class OrdersRepository {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<OrderDto[]>('/api/orders').pipe(
      map((dtos) => dtos.map(dtoToOrderModel))
    );
  }
}
`.trim();

  readonly codeRoutes = `
export const routes: Routes = [
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.routes').then((m) => m.ORDERS_ROUTES)
  }
];
`.trim();

  readonly codeAuthInterceptor = `
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.token;

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
      : req;

    return next.handle(authReq);
  }
}
`.trim();
}
