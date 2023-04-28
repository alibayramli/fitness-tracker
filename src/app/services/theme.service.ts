import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
  AvailableThemes,
  AvailableThemesMappingsDefault,
  AvailableThemesMappingsToggled,
} from '../components/switcher/switcher-theme/switcher-theme.constant';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _themeMode = AvailableThemes.LIGHT_MODE;

  public get themeMode() {
    return this._themeMode as keyof typeof AvailableThemesMappingsDefault;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    const themeModeSaved = localStorage.getItem('themeMode');
    this._themeMode =
      AvailableThemesMappingsDefault[
        themeModeSaved as keyof typeof AvailableThemesMappingsDefault
      ] || this._themeMode;
    this.setTheme();
  }

  public toggleThemeMode() {
    this._themeMode =
      AvailableThemesMappingsToggled[
        this._themeMode as keyof typeof AvailableThemesMappingsDefault
      ];

    localStorage.setItem('themeMode', this._themeMode);
    this.setTheme();
  }

  private setTheme() {
    switch (this._themeMode) {
      case AvailableThemes.DARK_MODE:
        this.document.body.classList.add('dark-mode');
        break;
      case AvailableThemes.LIGHT_MODE:
        this.document.body.classList.remove('dark-mode');
        break;
    }
  }
}
