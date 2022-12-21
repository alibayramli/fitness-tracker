import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';

import { ApiService } from 'src/app/services/api.service';
import { IClient } from 'src/app/models/client.model';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  public dataSource!: MatTableDataSource<IClient>;
  public clients!: IClient[];
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
    private confirmService: NgConfirmService,
    private toastService: NgToastService
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
    this.confirmService.showConfirm(
      'Are you sure you want to delete?',
      () => {
        this.apiService.deleteClient(id).subscribe({
          next: () => {
            this.toastService.success({
              detail: 'SUCCESS',
              summary: 'Deleted Successfully',
              duration: 3000,
            });
            this.getClients();
          },
          error: () => {
            this.toastService.error({
              detail: 'ERROR',
              summary: 'An error occured during deletion',
              duration: 3000,
            });
          },
        });
      },
      () => {}
    );
  }

  getClients() {
    this.apiService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.dataSource = new MatTableDataSource(this.clients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
}
