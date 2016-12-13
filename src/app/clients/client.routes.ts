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

import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { UserListResolve } from './users/user-list-resolve.service';
import { UserDetailResolve } from './users/user-detail-resolve.service';

import { AddressListComponent } from './address/address-list/address-list.component';
import { AddressDetailComponent } from './address/address-detail/address-detail.component';
import { AddressNewComponent } from './address/address-new/address-new.component';
import { AddressListResolve } from './address/address-list-resolve.service';
import { AddressDetailResolve } from './address/address-detail-resolve.service';

const routes: Routes = [
  { path: 'clients',
    component: ClientComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: ClientListComponent, canActivate: [AuthenticationGuard], resolve: { clients: ClientListResolve } },
      { path: 'create', component: ClientNewComponent, canActivate: [AuthenticationGuard] },
      { path: ':client_id', component: ClientDetailComponent, canActivate: [AuthenticationGuard], resolve: { client: ClientDetailResolve, users: UserListResolve, address: AddressListResolve } },
      
      { path: ':client_id/users/', component: UserListComponent, canActivate: [AuthenticationGuard], resolve: { users: UserListResolve } },
      { path: ':client_id/users/create', component: UserNewComponent, canActivate: [AuthenticationGuard] },
      { path: ':client_id/users/:id', component: UserDetailComponent, canActivate: [AuthenticationGuard], resolve: { user: UserDetailResolve } },

      { path: ':client_id/address/', component: AddressListComponent, canActivate: [AuthenticationGuard], resolve: { address: AddressListResolve } },
      { path: ':client_id/address/create', component: AddressNewComponent, canActivate: [AuthenticationGuard] },
      { path: ':client_id/address/:id', component: AddressDetailComponent, canActivate: [AuthenticationGuard], resolve: { address: AddressDetailResolve } },
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