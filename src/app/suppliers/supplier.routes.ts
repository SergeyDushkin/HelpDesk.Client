import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../guards/authentication-guard';

import { SupplierComponent } from './supplier.component';

import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierNewComponent } from './supplier-new/supplier-new.component';
import { SupplierListResolve } from './supplier-list-resolve.service';
import { SupplierDetailResolve } from './supplier-detail-resolve.service';

const routes: Routes = [
  { path: 'suppliers',
    component: SupplierComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: SupplierListComponent, canActivate: [AuthenticationGuard], resolve: { suppliers: SupplierListResolve } },
      { path: 'create', component: SupplierNewComponent, canActivate: [AuthenticationGuard] },
      { path: ':supplier_id', component: SupplierDetailComponent, canActivate: [AuthenticationGuard], resolve: { supplier: SupplierDetailResolve } },  

      //{ path: ':supplier_id/users/', component: UserListComponent, canActivate: [AuthenticationGuard], resolve: { users: UserListResolve } },
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
export class SupplierRoutingModule { }