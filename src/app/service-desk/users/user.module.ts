import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user.routes';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserSelectComponent } from './user-select/user-select.component';

let declarations = [
    UserListComponent,
    UserDetailComponent,
    UserNewComponent,
    UserSelectComponent,
];

import { UserService as ClientUserService } from './user.service';
import { UserListResolve } from './user-list-resolve.service';
import { UserDetailResolve } from './user-detail-resolve.service';

let services = [
  ClientUserService, UserListResolve, UserDetailResolve,
];

@NgModule({
  imports: [ CommonModule, FormsModule, UserRoutingModule ],
  declarations: [ declarations ],
  providers: [
    ...services
  ],
  exports: [ declarations ]
})
export class UserModule { }
