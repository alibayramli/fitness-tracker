import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileTitle, AvailableLanguages } from '../shared/models/language.model';

@Pipe({
  name: 'flagSrc',
  standalone: true,
})
export class FlagSrcPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(lang: AvailableLanguages): SafeUrl {
    const basePath = 'assets/images/flags/';
    const imageUrl = `${basePath}${FileTitle[lang]}.svg`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
