import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { IUser } from '../models/user.model';

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

export const isAdmin = () => {
  const usersDb = inject(Firestore);
  return authStatus().pipe(
    switchMap((auth) => {
      const usersDocRef = doc(usersDb, `users/${auth?.uid}`);
      return getDoc(usersDocRef);
    }),
    filter((doc) => {
      const user = { ...doc.data() } as IUser;
      return user.isAdmin;
    }),
    catchError(() => of(false))
  );
};
