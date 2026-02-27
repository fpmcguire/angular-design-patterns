import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { loadingInterceptor } from './app/shared/utils/loading.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([loadingInterceptor]))
  ]
}).catch(err => console.error(err));
