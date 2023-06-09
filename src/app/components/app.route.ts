import { Routes } from '@angular/router';
import {
  isLoggedIn,
  isEmailVerified,
  isNotEmailVerified,
} from '../guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.route').then((r) => r.AUTH_ROUTES),
    canMatch: [isNotEmailVerified],
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./client/client.route').then((r) => r.CLIENT_ROUTES),
    canMatch: [isLoggedIn, isEmailVerified],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./access/access-not-found/access-not-found.component'),
  },
  {
    path: 'not-authorized',
    loadComponent: () =>
      import('./access/access-not-authorized/access-not-authorized.component'),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
