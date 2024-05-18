import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('../components/home/home.component') },
  { path: 'profile', loadComponent: () => import('../components/profile/profile.component') },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
