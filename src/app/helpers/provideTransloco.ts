import {
  EnvironmentProviders,
  importProvidersFrom,
  isDevMode,
  makeEnvironmentProviders,
} from '@angular/core';
import {
  translocoConfig,
  TranslocoConfig,
  TranslocoModule,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
} from '@ngneat/transloco';
import { TranslocoHttpLoader } from '../services/translate.service';

export const provideTransloco = (
  config: Partial<TranslocoConfig>
): EnvironmentProviders => {
  return makeEnvironmentProviders([
    importProvidersFrom(TranslocoModule),
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: config.availableLangs,
        defaultLang: config.defaultLang,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ]);
};
