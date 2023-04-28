import { Routes } from '@angular/router';
import {
  isLoggedIn,
  isNotEmailVerified,
  isNotLoggedIn,
} from 'src/app/guards/auth.guard';
import AuthRegisterComponent from './auth-register/auth-register.component';
import AuthLoginComponent from './auth-login/auth-login.component';
import AuthVerifyEmailComponent from './auth-verify-email/auth-verify-email.component';
import AuthRecoverPasswordComponent from './auth-recover-password/auth-recover-password.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    canActivate: [isNotEmailVerified],
    children: [
      {
        path: 'register',
        component: AuthRegisterComponent,
      },
      {
        path: 'login',
        component: AuthLoginComponent,
      },
      {
        path: 'recover-password',
        component: AuthRecoverPasswordComponent,
      },
    ],
  },
  {
    path: 'verify-email',
    component: AuthVerifyEmailComponent,
    canActivate: [isLoggedIn, isNotEmailVerified],
  },
  {
    path: 'recover-password',
    component: AuthRecoverPasswordComponent,
    canActivate: [isNotLoggedIn],
  },
];
