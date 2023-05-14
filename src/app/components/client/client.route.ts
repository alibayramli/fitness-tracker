import { Routes } from '@angular/router';
import ClientRegisterComponent from './client-register/client-register.component';
import ClientListsComponent from './client-lists/client-lists.component';
import ClientListComponent from './client-list/client-list.component';
import { isAdmin } from 'src/app/guards/auth.guard';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'lists',
    component: ClientListsComponent,
    canMatch: [isAdmin],
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
  { path: '**', redirectTo: 'register' },
];
