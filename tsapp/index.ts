import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { FORM_PROVIDERS } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { AuthGuard } from './common/auth.guard';
import { CommService } from './pictpage/commService';

import { App } from './app';
import { routes } from './app.routes';

bootstrap(
  App,
  [
    provideRouter(routes),
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    AuthGuard,
    CommService
  ]
);
