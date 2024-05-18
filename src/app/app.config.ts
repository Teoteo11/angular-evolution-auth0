import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environments';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideAuth0({
      domain: environment.domainAuth0,
      clientId: environment.clientIdAuth0,
      authorizationParams: {
        redirect_uri: environment.redirectUriAuth0,
        audience: environment.audienceAuth0,
        scope: 'openid profile email offline_access'
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage', // silent authentication not working in safari, so we use localstorage
      httpInterceptor: {
        allowedList: [
          { uri: 'https://jsonplaceholder.typicode.com/*'}
        ]
      }
    }),
  ]
};
