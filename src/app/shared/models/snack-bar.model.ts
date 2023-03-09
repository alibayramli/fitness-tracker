import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface ISnackBar {}
export class SnackBarConfig {
  public static getDefaultConfig(): MatSnackBarConfig<ISnackBar> {
    return {
      duration: 2000,
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
