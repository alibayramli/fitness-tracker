import { Component, OnInit } from '@angular/core';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AVAILABLE_LANGUAGES } from 'src/app/shared/constants/languages.contant';
import { TranslocoService } from '@ngneat/transloco';
import { FlagSrcPipe } from 'src/app/pipes/lang-asset.pipe';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    NgFor,
    NgTemplateOutlet,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FlagSrcPipe,
  ],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {
  public availableLanguages = AVAILABLE_LANGUAGES;
  public selectedLanguage!: string;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.selectedLanguage = this.translocoService.getActiveLang();
  }

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
    this.selectedLanguage = lang;
  }
}
