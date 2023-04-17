import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { FirebaseError } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  public loginForm!: FormGroup;
  private isSpinnerActive = new BehaviorSubject<boolean>(false);
  public isSpinnerActive$ = this.isSpinnerActive.asObservable();
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private snackbarService: SnackBarService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        'ali.bayramli@example.com',
        [Validators.required, Validators.email],
      ],
      password: ['admin', Validators.required],
      rememberMe: [''],
    });
  }

  login(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isSpinnerActive.next(true);
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        this.isSpinnerActive.next(true);
        this.snackbarService.openSnackBar('Successful login!');
        this.router.navigate(['']);
      })
      .catch((error: FirebaseError) => {
        this.isSpinnerActive.next(false);
        this.snackbarService.openSnackBar(error.message);
      });
  }
}
