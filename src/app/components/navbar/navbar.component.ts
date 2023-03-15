import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

import { ThemeService } from 'src/app/services/theme.service';
import { AVAILABLE_LANGUAGES } from 'src/app/shared/constants/languages.contant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgTemplateOutlet,
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    AsyncPipe,
    TranslocoModule,
  ],
})
export class NavbarComponent implements OnInit {
  public availableLanguages = AVAILABLE_LANGUAGES;
  public selectedLanguage!: string;
  constructor(
    public themeService: ThemeService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = this.translocoService.getActiveLang();
  }

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
    this.selectedLanguage = lang;
  }
}
