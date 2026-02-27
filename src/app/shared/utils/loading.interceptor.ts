import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingStateService } from './loading-state.service';

const IGNORE_HEADER = 'X-Loading-Ignore';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has(IGNORE_HEADER)) {
    return next(req);
  }

  const loading = inject(LoadingStateService);
  loading.start();

  return next(req).pipe(finalize(() => loading.stop()));
};
