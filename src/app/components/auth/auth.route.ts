import { Routes } from '@angular/router';
import { isLoggedIn } from 'src/app/guards/auth.guard';
import AuthRegisterComponent from './auth-register/auth-register.component';
import AuthLoginComponent from './auth-login/auth-login.component';
import AuthVerifyEmailComponent from './auth-verify-email/auth-verify-email.component';
import AuthRecoverPasswordComponent from './auth-recover-password/auth-recover-password.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: AuthRegisterComponent,
    title: 'Register',
  },
  {
    path: 'login',
    component: AuthLoginComponent,
    title: 'Login',
  },
  {
    path: 'recover-password',
    component: AuthRecoverPasswordComponent,
    title: 'Recover password',
  },
  {
    path: 'verify-email',
    component: AuthVerifyEmailComponent,
    canActivate: [isLoggedIn],
    title: 'Verify Email',
  },
  { path: '**', redirectTo: 'login' },
];
