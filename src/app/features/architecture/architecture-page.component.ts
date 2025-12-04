// src/app/architecture/architecture-page.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-architecture-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './architecture-page.component.html',
  styleUrls: ['./architecture-page.component.scss']
})
export class ArchitecturePageComponent {
  private readonly viewport = inject(ViewportScroller);

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
