import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { filter, takeUntil, Subject } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { IClient } from 'src/app/models/client.model';
import {
  DISPLAYED_COLUMNS,
  ClientsListSnackBar,
  ClientsListDialog,
} from './clients-list.constant';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    TranslocoModule,
  ],
})
export class ClientsListComponent implements OnInit, OnDestroy {
  public dataSource!: MatTableDataSource<IClient>;
  public clients!: IClient[];
  public readonly displayedColumns = DISPLAYED_COLUMNS;
  private _unsubscribeAll: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private dialogService: DialogService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editClient(id: number) {
    this.router.navigate(['update', id]);
  }

  deleteClient(id: number) {
    this.dialogService
      .openDialog({
        data: {
          title: ClientsListDialog.TITLE,
          message: ClientsListDialog.MESSAGE,
          confirmText: ClientsListDialog.CONFIRM_TEXT,
          cancelText: ClientsListDialog.CANCEL_TEXT,
        },
      })
      .pipe(
        filter((isConfirmed) => isConfirmed),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe({
        next: () => {
          this.clientService
            .deleteClient(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: () => {
                this.snackBarService.openSnackBar(
                  ClientsListSnackBar.DELETE_SUCCESS
                );
                this.getClients();
              },
            });
        },
      });
  }

  getClients() {
    this.clientService
      .getClients()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (clients) => {
          this.clients = clients;
          this.dataSource = new MatTableDataSource(this.clients);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.unsubscribe();
  }
}
