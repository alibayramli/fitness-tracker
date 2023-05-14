import { Routes } from '@angular/router';
import ClientRegisterComponent from './client-register/client-register.component';
import ClientListsComponent from './client-lists/client-lists.component';
import ClientListComponent from './client-list/client-list.component';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'lists',
    pathMatch: 'full',
  },
  {
    path: 'lists',
    component: ClientListsComponent,
  },
  {
    path: 'list/:id',
    component: ClientListComponent,
  },
  {
    path: 'register',
    component: ClientRegisterComponent,
  },
  {
    path: 'update/:id',
    component: ClientRegisterComponent,
  },
  { path: '**', redirectTo: 'lists' },
];
