import { Routes } from '@angular/router';
import { AuthRegisterComponent } from './auth/auth-register/auth-register.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { AuthVerifyEmailComponent } from './auth/auth-verify-email/auth-verify-email.component';
import { AuthRecoverPasswordComponent } from './auth/auth-recover-password/auth-recover-password.component';
import { ClientRegisterComponent } from './client/client-register/client-register.component';
import { ClientListsComponent } from './client/client-lists/client-lists.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'auth-register',
    component: AuthRegisterComponent,
  },
  {
    path: 'auth-login',
    component: AuthLoginComponent,
  },
  {
    path: 'auth-verify-email',
    component: AuthVerifyEmailComponent,
  },
  {
    path: 'auth-recover-password',
    component: AuthRecoverPasswordComponent,
  },
  {
    path: 'client-register',
    component: ClientRegisterComponent,
  },
  {
    path: 'client-lists',
    component: ClientListsComponent,
  },
  {
    path: 'client-details/:id',
    component: ClientDetailsComponent,
  },
  {
    path: 'client-update/:id',
    component: ClientRegisterComponent,
  },
];
