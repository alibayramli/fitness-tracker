import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { map } from 'rxjs';

const authStatus = () => {
  const afAuth = inject(Auth);
  return authState(afAuth).pipe();
};

export const isLoggedIn = () => {
  return authStatus().pipe(map((status) => !!status));
};

export const isNotLoggedIn = () => {
  return isLoggedIn().pipe(map((status) => !status));
};

export const isEmailVerified = () => {
  return authStatus().pipe(map((status) => status?.emailVerified));
};

export const isNotEmailVerified = () => {
  return isEmailVerified().pipe(map((status) => !status));
};
