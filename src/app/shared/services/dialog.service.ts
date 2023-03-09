import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { IDialog } from '../models/dialog.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(data: IDialog): Observable<boolean> {
    return this.dialog
      .open(DialogComponent, {
        data,
        width: '400px',
        disableClose: false,
      })
      .afterClosed();
  }
}
