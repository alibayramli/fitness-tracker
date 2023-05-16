import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AppLogoComponent } from 'src/app/shared/components/app-logo/app-logo.component';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, AppLogoComponent],
  templateUrl: './auth-verify-email.component.html',
  styleUrls: ['./auth-verify-email.component.scss'],
})
export default class AuthVerifyEmailComponent {}
