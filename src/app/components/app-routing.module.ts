import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { ClientsListComponent } from './clients-list/clients-list.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
