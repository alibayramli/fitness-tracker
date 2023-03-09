import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogConfig } from '../models/dialog.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(config = DialogConfig.getDefaultConfig()): Observable<boolean> {
    return this.dialog.open(DialogComponent, config).afterClosed();
  }
}
