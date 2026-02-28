/**
 * Architecture code examples and reference implementations.
 * Separated from component for content reusability and maintainability.
 * Allows future migration to backend API or markdown imports.
 */

export interface ArchitectureExample {
  codeFolderLayout: string;
  codeFeatureStructure: string;
  codeFacade: string;
  codeRepository: string;
  codeRoutes: string;
  codeAuthInterceptor: string;
  projectStructure: string;
}

export const ARCHITECTURE_EXAMPLES: ArchitectureExample = {
  codeFolderLayout: `
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
      util/`.trim(),

  codeFeatureStructure: `
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
    auth.api.ts`.trim(),

  codeFacade: `
@Injectable({ providedIn: 'root' })
export class OrdersFacade {
  readonly orders   = toSignal(this.store.select(selectOrders));
  readonly loading  = toSignal(this.store.select(selectOrdersLoading));

  constructor(private store: Store) {}

  load(): void {
    this.store.dispatch(OrdersActions.load());
  }
}`.trim(),

  codeRepository: `
@Injectable({ providedIn: 'root' })
export class OrdersRepository {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Order[]> {
    return this.http.get<OrderDto[]>('/api/orders').pipe(
      map(dtos => dtos.map(dtoToOrderModel))
    );
  }
}`.trim(),

  codeRoutes: `
export const routes: Routes = [
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.routes').then(m => m.ORDERS_ROUTES),
  },
];`.trim(),

  codeAuthInterceptor: `
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token;
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } })
    : req;
  return next(authReq);
};`.trim(),

  projectStructure: `
angular-design-patterns/
├── src/
│   ├── app/
│   │   ├── features/                    # Business domains
│   │   │   ├── architecture/            # Example: this page
│   │   │   ├── patterns/                # Design patterns catalog
│   │   │   ├── classic-patterns/        # Gang of Four patterns
│   │   │   ├── solid/                   # SOLID principles
│   │   │   ├── grasp/                   # GRASP patterns
│   │   │   ├── clean-code/              # Clean code principles
│   │   │   ├── frontend-architecture/   # Frontend architecture
│   │   │   └── reactive-principles/     # Reactive patterns
│   │   ├── shared/                      # Reusable infrastructure
│   │   │   ├── components/              # Dumb UI components
│   │   │   ├── utils/                   # Pure functions & services
│   │   │   ├── models/                  # Interfaces & types
│   │   │   ├── sidebar/                 # Feature navigation
│   │   │   ├── header/                  # Layout header
│   │   │   └── footer/                  # Layout footer
│   │   ├── app.component.ts             # Root component
│   │   ├── app.routes.ts                # Route definitions
│   │   └── app.config.ts                # App providers
│   ├── environments/                    # Environment configs
│   ├── styles/                          # Global styles (SCSS tokens)
│   └── index.html                       # Entry point
├── e2e/                                 # End-to-end tests (Playwright)
├── docs/                                # Documentation
├── angular.json                         # Angular CLI config
├── vitest.config.ts                     # Unit test config
├── playwright.config.ts                 # E2E test config
└── tsconfig.json                        # TypeScript config`.trim(),
};
