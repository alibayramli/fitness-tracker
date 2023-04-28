export enum AvailableThemes {
  LIGHT_MODE = 'light_mode',
  DARK_MODE = 'dark_mode',
}

export const AvailableThemesMappingsDefault = {
  [AvailableThemes.DARK_MODE]: AvailableThemes.DARK_MODE,
  [AvailableThemes.LIGHT_MODE]: AvailableThemes.LIGHT_MODE,
};

export const AvailableThemesMappingsToggled = {
  [AvailableThemes.DARK_MODE]: AvailableThemes.LIGHT_MODE,
  [AvailableThemes.LIGHT_MODE]: AvailableThemes.DARK_MODE,
};
