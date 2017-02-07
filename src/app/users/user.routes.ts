import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserListResolve } from './user-list-resolve.service';
import { UserDetailResolve } from './user-detail-resolve.service';

const routes: Routes = [
  { path: '',
    component: UserComponent, 
    children: [
      { path: '', component: UserListComponent, resolve: { users: UserListResolve } },
      { path: 'create', component: UserNewComponent },
      { path: ':id', component: UserDetailComponent, resolve: { users: UserDetailResolve } }
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
export class UserRoutingModule { }