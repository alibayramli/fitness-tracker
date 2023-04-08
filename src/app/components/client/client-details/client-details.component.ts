import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { switchMap } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { IClient } from 'src/app/models/client.model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
  ],
})
export class ClientDetailsComponent implements OnInit {
  public clientId!: number;
  clientDetail!: IClient;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((value) => {
          this.clientId = value['id'];
          return this.clientService.getClientById(this.clientId);
        })
      )
      .subscribe({
        next: (client) => {
          this.clientDetail = client;
        },
      });
  }
}
