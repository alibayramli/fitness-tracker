import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private afAuth = inject(AngularFireAuth);
  private snackbarService = inject(SnackBarService);
  private isSpinnerActive = new BehaviorSubject<boolean>(false);
  public isSpinnerActive$ = this.isSpinnerActive.asObservable();

  public async register(email: string, password: string) {
    try {
      this.isSpinnerActive.next(true);
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.verifyEmail();
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
      const user = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.isSpinnerActive.next(false);
      if (user.user?.emailVerified) {
        this.router.navigate(['client-register']);
        this.snackbarService.openSnackBar('Successful login!');
      } else {
        this.router.navigate(['auth-verify-email']);
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
      await this.afAuth.sendPasswordResetEmail(email);
      this.snackbarService.openSnackBar(
        'We sent you an email to recover your password'
      );
      this.isSpinnerActive.next(false);
      this.router.navigate(['auth-login']);
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
    this.router.navigate(['auth-login']);
  }

  private async verifyEmail() {
    const user = await this.afAuth.currentUser;
    await user?.sendEmailVerification();
    this.isSpinnerActive.next(false);
    this.snackbarService.openSnackBar('Verification sent to your email!');
    this.router.navigate(['auth-login']);
  }
}
