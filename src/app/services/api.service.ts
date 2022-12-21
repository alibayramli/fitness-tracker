import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/enquiry';

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<IClient[]>(`${this.baseUrl}`);
  }

  getClientById(id: number) {
    return this.http.get<IClient>(`${this.baseUrl}/${id}`);
  }

  addClient(client: IClient) {
    return this.http.post<IClient>(`${this.baseUrl}`, client);
  }

  updateClient(client: IClient, id: number) {
    return this.http.put<IClient>(`${this.baseUrl}/${id}`, client);
  }

  deleteClient(id: number) {
    return this.http.delete<number>(`${this.baseUrl}/${id}`);
  }
}
