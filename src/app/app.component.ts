import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="app-shell">
      <header class="app-header">
        <h1>Angular Design Patterns</h1>
        <span class="app-header__subtitle">Angular 21 · Jest · Frontend & UI patterns catalog</span>
      </header>

      <main class="app-main">
        <nav class="sidebar">
          <a
            routerLink="/patterns"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            🧩 Angular Patterns
          </a>

          <a
            routerLink="/classic"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            📚 Classic GoF
          </a>

          <a
            routerLink="/solid"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            🧱 S.O.L.I.D.
          </a>

          <a
            routerLink="/grasp"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            🧠 GRASP
          </a>
        </nav>

        <section class="content">
          <router-outlet></router-outlet>
        </section>
      </main>

      <footer class="app-footer">
        <span>Angular 21 · Jest · Design Patterns Demo</span>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #111827;
      background: #f3f4f6;
    }

    .app-shell {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .app-header {
      padding: 1rem 1.5rem;
      background: #111827;
      color: #f9fafb;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }

    .app-header h1 {
      font-size: 1.4rem;
      margin: 0;
    }

    .app-header__subtitle {
      font-size: 0.85rem;
      color: #e5e7eb;
    }

    .app-main {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 0;
      flex: 1;
      min-height: 0;
    }

    .sidebar {
      background: #111827;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .sidebar a {
      color: #d1d5db;
      text-decoration: none;
      padding: 0.45rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      transition: background 0.15s, color 0.15s, transform 0.05s;
    }

    .sidebar a:hover {
      background: #1f2937;
      color: #f9fafb;
      transform: translateX(1px);
    }

    .sidebar a.active {
      background: #f97316;
      color: #111827;
      font-weight: 600;
    }

    .content {
      padding: 1.5rem;
      overflow: auto;
    }

    .app-footer {
      padding: 0.6rem 1.5rem;
      font-size: 0.8rem;
      color: #6b7280;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }
  `]
})
export class AppComponent { }
