import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  private authService = inject(AuthService);

  logOut() {
    this.authService.logOut();
  }
}
