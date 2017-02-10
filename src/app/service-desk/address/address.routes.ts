import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { AddressListComponent } from './address-list/address-list.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { AddressNewComponent } from './address-new/address-new.component';
import { AddressListResolve } from './address-list-resolve.service';
import { AddressDetailResolve } from './address-detail-resolve.service';

const routes: Routes = [
  { path: ':resource/:referenceId/address', component: AddressListComponent, resolve: { address: AddressListResolve } },
  { path: ':resource/:referenceId/address/create', component: AddressNewComponent },
  { path: ':resource/:referenceId/address/:id', component: AddressDetailComponent, resolve: { address: AddressDetailResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AddressRoutingModule { }