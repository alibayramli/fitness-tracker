import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { switchMap } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { IClient } from 'src/app/models/client.model';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    SpinnerComponent,
  ],
})
export default class ClientDetailsComponent implements OnInit {
  public clientId!: number;
  clientDetail!: IClient;

  constructor(
    private activatedRoute: ActivatedRoute,
    public clientService: ClientService
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
