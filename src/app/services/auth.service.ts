import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  authState,
} from '@angular/fire/auth';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
import { FirebaseError } from 'firebase/app';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private afAuth = inject(Auth);
  private db = inject(Firestore);
  private snackbarService = inject(SnackBarService);

  private isSpinnerActive = new BehaviorSubject<boolean>(false);
  public isSpinnerActive$ = this.isSpinnerActive.asObservable();
  public isAuthenticated$: Observable<boolean>;

  constructor() {
    this.isAuthenticated$ = authState(this.afAuth).pipe(
      map((state) => !!state && state.emailVerified)
    );
  }

  public get userData() {
    return this.afAuth.currentUser;
  }

  public async register(newUser: IUser) {
    try {
      this.isSpinnerActive.next(true);
      await createUserWithEmailAndPassword(
        this.afAuth,
        newUser.email,
        newUser.password
      );
      if (this.userData) {
        await updateProfile(this.userData, { displayName: newUser.firstName });
        await sendEmailVerification(this.userData);
        // Note: this is NOT a safe way to create an admin user,
        // implemented for demonstration purposes!
        await this.saveUser(this.userData.uid, newUser);
      }
      this.isSpinnerActive.next(false);
      this.snackbarService.openSnackBar('Verification sent to your email!');
      this.router.navigate(['auth/login']);
    } catch (error) {
      this.isSpinnerActive.next(false);
      if (error instanceof FirebaseError) {
        this.snackbarService.openSnackBar(error.message);
      }
    }
  }

  public async login(email: string, password: string) {
    try {
      this.isSpinnerActive.next(true);
      const user = await signInWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      this.isSpinnerActive.next(false);
      if (user.user?.emailVerified) {
        this.router.navigate(['client/register']);
        this.snackbarService.openSnackBar('Successful login!');
      } else {
        this.router.navigate(['auth/verify-email']);
      }
    } catch (error) {
      this.isSpinnerActive.next(false);
      if (error instanceof FirebaseError) {
        this.snackbarService.openSnackBar(error.message);
      }
    }
  }

  public async recoverPassword(email: string) {
    try {
      this.isSpinnerActive.next(true);
      await sendPasswordResetEmail(this.afAuth, email);
      this.isSpinnerActive.next(false);
      this.snackbarService.openSnackBar(
        'We sent you an email to recover your password'
      );
      this.router.navigate(['auth/login']);
    } catch (error) {
      this.isSpinnerActive.next(false);
      if (error instanceof FirebaseError) {
        this.snackbarService.openSnackBar(error.message);
      }
    }
  }

  public async logOut() {
    this.isSpinnerActive.next(true);
    await this.afAuth.signOut();
    this.isSpinnerActive.next(false);
    this.snackbarService.openSnackBar('Logged out!');
    this.router.navigate(['']);
  }

  private async saveUser(id: string, user: IUser) {
    const { password, ...credentialsToStore } = user;
    await setDoc(doc(this.db, 'users', id), credentialsToStore);
  }
}
