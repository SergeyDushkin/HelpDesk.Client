import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../guards/authentication-guard';

import { ClientComponent } from './client.component';

import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientListResolve } from './client-list-resolve.service';
import { ClientDetailResolve } from './client-detail-resolve.service';

const routes: Routes = [
  { path: 'clients',
    component: ClientComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: ClientListComponent, canActivate: [AuthenticationGuard], resolve: { clients: ClientListResolve } },
      { path: 'create', component: ClientNewComponent, canActivate: [AuthenticationGuard] },
      { path: ':client_id', component: ClientDetailComponent, canActivate: [AuthenticationGuard], resolve: { client: ClientDetailResolve  } }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ClientRoutingModule { }