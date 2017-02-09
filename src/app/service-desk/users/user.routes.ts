import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserListResolve } from './user-list-resolve.service';
import { UserDetailResolve } from './user-detail-resolve.service';

const routes: Routes = [
  { path: ':resource/:referenceId/users', component: UserListComponent, resolve: { users: UserListResolve } },
  { path: ':resource/:referenceId/users/create', component: UserNewComponent },
  { path: ':resource/:referenceId/users/:id', component: UserDetailComponent, resolve: { user: UserDetailResolve } },

  { path: ':resource/users', component: UserListComponent, resolve: { users: UserListResolve } },
  { path: ':resource/users/create', component: UserNewComponent },
  { path: ':resource/users/:id', component: UserDetailComponent, resolve: { user: UserDetailResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }