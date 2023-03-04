import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _isDarkMode = new BehaviorSubject<boolean>(true);
  public isDarkMode$ = this._isDarkMode.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleThemeMode() {
    this._isDarkMode.next(!this._isDarkMode.value);
    if (this._isDarkMode.value) {
      this.document.body.classList.remove('light-mode');
    } else {
      this.document.body.classList.add('light-mode');
    }
  }
}
