import { Routes } from '@angular/router';
import { isLoggedIn, isEmailVerified } from '../guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.route').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./client/client.route').then((m) => m.CLIENT_ROUTES),
    canMatch: [isLoggedIn, isEmailVerified],
  },
  { path: '**', redirectTo: '' },
];
