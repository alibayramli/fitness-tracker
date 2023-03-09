import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { filter, takeUntil, Subject } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { IClient } from 'src/app/models/client.model';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit, OnDestroy {
  public dataSource!: MatTableDataSource<IClient>;
  public clients!: IClient[];
  private _unsubscribeAll: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'bmiResult',
    'gender',
    'package',
    'enquiryDate',
    'action',
  ];

  constructor(
    private apiService: ApiService,
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
        title: 'Delete client',
        message: 'Are you sure you want to delete?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .pipe(
        filter((isConfirmed) => isConfirmed),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe({
        next: () => {
          this.apiService
            .deleteClient(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: () => {
                this.snackBarService.openSnackBar('Deleted Successfully');
                this.getClients();
              },
            });
        },
      });
  }

  getClients() {
    this.apiService
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
