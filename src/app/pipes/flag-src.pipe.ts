import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  AvailableLanguages,
  AvailableLanguagesFileTitle,
} from '../shared/models/language.model';

@Pipe({
  name: 'flagSrc',
  standalone: true,
})
export class FlagSrcPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(language: AvailableLanguages): SafeUrl {
    const basePath = 'assets/images/flags/';
    const imageUrl = `${basePath}${AvailableLanguagesFileTitle[language]}.svg`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
