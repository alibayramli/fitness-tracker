import { Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { ClientsListComponent } from './clients-list/clients-list.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterClientComponent,
  },
  {
    path: 'list',
    component: ClientsListComponent,
  },
  {
    path: 'detail/:id',
    component: ClientDetailsComponent,
  },
  {
    path: 'update/:id',
    component: RegisterClientComponent,
  },
];
