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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FirebaseError } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-auth-register',
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
  ],
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  private isSpinnerActive = new BehaviorSubject<boolean>(false);
  public isSpinnerActive$ = this.isSpinnerActive.asObservable();

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private snackbarService: SnackBarService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }
  register(): void {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.isSpinnerActive.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.isSpinnerActive.next(false);
        this.snackbarService.openSnackBar('Successful registration!');
        this.router.navigate(['/auth-login']);
      })
      .catch((error: FirebaseError) => {
        this.isSpinnerActive.next(false);
        this.snackbarService.openSnackBar(error.message);
      });
  }
}
