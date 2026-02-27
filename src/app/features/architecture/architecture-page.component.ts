import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-architecture-page',
  standalone: true,
  imports: [],
  templateUrl: './architecture-page.component.html',
  styleUrl: './architecture-page.component.scss',
})
export class ArchitecturePageComponent {
  private readonly viewport = inject(ViewportScroller);

  onTocClick(event: Event, fragment: string): void {
    event.preventDefault();
    if (typeof document !== 'undefined') {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      util/`.trim();

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
    auth.api.ts`.trim();

  readonly codeFacade = `
@Injectable({ providedIn: 'root' })
export class OrdersFacade {
  readonly orders   = toSignal(this.store.select(selectOrders));
  readonly loading  = toSignal(this.store.select(selectOrdersLoading));

  constructor(private store: Store) {}

  load(): void {
    this.store.dispatch(OrdersActions.load());
  }
}`.trim();

  readonly codeRepository = `
@Injectable({ providedIn: 'root' })
export class OrdersRepository {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Order[]> {
    return this.http.get<OrderDto[]>('/api/orders').pipe(
      map(dtos => dtos.map(dtoToOrderModel))
    );
  }
}`.trim();

  readonly codeRoutes = `
export const routes: Routes = [
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.routes').then(m => m.ORDERS_ROUTES),
  },
];`.trim();

  readonly codeAuthInterceptor = `
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token;
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } })
    : req;
  return next(authReq);
};`.trim();
}
