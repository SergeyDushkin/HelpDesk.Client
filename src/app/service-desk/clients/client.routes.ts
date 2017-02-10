import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientListResolve } from './client-list-resolve.service';
import { ClientDetailResolve } from './client-detail-resolve.service';

const routes: Routes = [
  { path: 'clients', component: ClientListComponent, resolve: { clients: ClientListResolve } },
  { path: 'clients/create', component: ClientNewComponent },
  { path: 'clients/:id', component: ClientDetailComponent, resolve: { client: ClientDetailResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ClientRoutingModule { }