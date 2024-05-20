import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthService, authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environments';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

export const getToken = () => localStorage.getItem('access_token');

export const controlInterceptor = () => withInterceptors(getToken() ? [authHttpInterceptorFn] : [])


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(controlInterceptor()),
    provideAuth0({
      domain: environment.domainAuth0,
      clientId: environment.clientIdAuth0,
      authorizationParams: {
        redirect_uri: environment.redirectUriAuth0,
        audience: environment.audienceAuth0,
        scope: 'openid profile email offline_access',
      },
      useRefreshTokens: true,
      useRefreshTokensFallback: true,
      cacheLocation: 'localstorage', // silent authentication not working in safari, so we use localstorage
      httpInterceptor: {
        allowedList: [
          { uri: 'https://jsonplaceholder.typicode.com/*'}
        ]
      }
    }),
  ]
};
