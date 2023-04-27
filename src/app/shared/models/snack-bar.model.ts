import { MatSnackBarConfig } from '@angular/material/snack-bar';

export class SnackBarConfig {
  public static getDefaultConfig(): MatSnackBarConfig {
    return {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: {},
    };
  }
}

export enum SnackBarParams {
  MESSAGE = 'Message',
  ACTION = 'Close',
}
