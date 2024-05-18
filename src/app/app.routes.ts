import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('../components/home/home.component') },
  { 
    path: 'profile', 
    loadComponent: () => import('../components/profile/profile.component'),
    canActivate: [authGuardFn] 
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
