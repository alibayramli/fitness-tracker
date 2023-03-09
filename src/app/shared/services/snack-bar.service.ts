import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarConfig, SnackBarParams } from '../models/snack-bar.model';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    message: string = SnackBarParams.MESSAGE,
    action: string = SnackBarParams.ACTION,
    config = SnackBarConfig.getDefaultConfig()
  ) {
    this.snackBar.open(message, action, config);
  }
}
