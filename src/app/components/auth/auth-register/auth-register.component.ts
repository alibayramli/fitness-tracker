import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { AppLogoComponent } from 'src/app/shared/components/app-logo/app-logo.component';
import { User } from 'src/app/models/user.model';
import { passwordMatchValidator } from 'src/app/utils/auth/auth-register-validators';

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
    MatCardModule,
    SpinnerComponent,
    AppLogoComponent,
  ],
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export default class AuthRegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        repeatPassword: ['', Validators.required],
      },
      {
        validators: passwordMatchValidator('password', 'repeatPassword'),
      }
    );
  }
  register(): void {
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const newUser = new User({ firstName, lastName, email, password });
    this.authService.register(newUser);
  }
}
