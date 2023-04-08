import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './auth-user-profile.component.html',
  styleUrls: ['./auth-user-profile.component.scss'],
})
export class AuthUserProfileComponent {
  user = { name: 'Ali', email: 'ali@gmail.com' };

  register() {
    console.log('register');
  }

  login() {
    console.log('signin');
  }

  logOut() {
    console.log('signout');
  }
}
