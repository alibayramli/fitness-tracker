import { Routes } from '@angular/router';
import ClientRegisterComponent from './client-register/client-register.component';
import ClientListsComponent from './client-lists/client-lists.component';
import ClientDetailsComponent from './client-details/client-details.component';

export const CLIENT_ROUTES: Routes = [
  {
    path: 'lists',
    component: ClientListsComponent,
  },
  {
    path: 'details/:id',
    component: ClientDetailsComponent,
  },
  {
    path: 'register',
    component: ClientRegisterComponent,
  },
  {
    path: 'update/:id',
    component: ClientRegisterComponent,
  },
];
