import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';

import { AuthService } from 'src/app/services/auth.service';
import { AuthUserProfileComponent } from '../../auth/auth-user-profile/auth-user-profile.component';
import { SwitcherLanguageComponent } from '../../switcher/switcher-language/switcher-language.component';
import { SwitcherThemeComponent } from '../../switcher/switcher-theme/switcher-theme.component';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    TranslocoModule,
    SwitcherThemeComponent,
    SwitcherLanguageComponent,
    AuthUserProfileComponent,
  ],
})
export class LayoutHeaderComponent {
  public authService = inject(AuthService);
}
