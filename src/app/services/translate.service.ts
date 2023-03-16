import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { AvailableLanguages, FileTitle } from '../shared/models/language.model';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: AvailableLanguages) {
    return this.http.get<Translation>(`/assets/i18n/${FileTitle[lang]}.json`);
  }
}
