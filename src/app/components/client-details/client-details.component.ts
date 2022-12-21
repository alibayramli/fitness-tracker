import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';
import { IClient } from 'src/app/models/client.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {
  public clientId!: number;
  clientDetail!: IClient;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((value) => {
          this.clientId = value['id'];
          return this.apiService.getClientById(this.clientId);
        })
      )
      .subscribe({
        next: (client) => {
          this.clientDetail = client;
        },
      });
  }
}
