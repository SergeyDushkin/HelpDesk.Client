import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserSelectComponent } from './user-select/user-select.component';

import { UserService } from './user.service';
import { UserListResolve } from './user-list-resolve.service';
import { UserDetailResolve } from './user-detail-resolve.service';

let services = [
  UserService, UserListResolve, UserDetailResolve
];

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule ],
  declarations: [ UserListComponent, UserDetailComponent, UserNewComponent, UserSelectComponent ],
  providers: [
    ...services
  ],
  exports: [ UserListComponent, UserDetailComponent, UserNewComponent, UserSelectComponent ]
})
export class UserModule { }
