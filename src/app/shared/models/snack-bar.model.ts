import { MatSnackBarConfig } from '@angular/material/snack-bar';

export class SnackBarConfig {
  public static getDefaultConfig(): MatSnackBarConfig {
    return {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: {},
    };
  }
}

export enum SnackBarParams {
  MESSAGE = 'Message',
  ACTION = 'Close',
}
