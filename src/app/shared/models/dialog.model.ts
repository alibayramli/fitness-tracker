import { MatDialogConfig } from '@angular/material/dialog';

export interface IDialog {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

export class DialogConfig {
  public static getDefaultConfig(): MatDialogConfig<IDialog> {
    return {
      width: '400px',
      disableClose: false,
      data: {
        title: 'Title',
        message: 'Message',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      },
    };
  }
}
