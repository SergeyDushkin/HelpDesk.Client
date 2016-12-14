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

import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { UserListResolve } from './users/user-list-resolve.service';
import { UserDetailResolve } from './users/user-detail-resolve.service';

const routes: Routes = [
  { path: 'suppliers',
    component: SupplierComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: SupplierListComponent, canActivate: [AuthenticationGuard], resolve: { suppliers: SupplierListResolve } },
      { path: 'create', component: SupplierNewComponent, canActivate: [AuthenticationGuard] },
      { path: ':supplier_id', component: SupplierDetailComponent, canActivate: [AuthenticationGuard], resolve: { supplier: SupplierDetailResolve, users: UserListResolve } },  

      { path: ':supplier_id/users/', component: UserListComponent, canActivate: [AuthenticationGuard], resolve: { users: UserListResolve } },
      { path: ':supplier_id/users/create', component: UserNewComponent, canActivate: [AuthenticationGuard] },
      { path: ':supplier_id/users/:id', component: UserDetailComponent, canActivate: [AuthenticationGuard], resolve: { user: UserDetailResolve } },
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