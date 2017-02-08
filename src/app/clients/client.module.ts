import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

/* Feature Modules */
import { UserModule } from '../users/user.module';
import { AddressModule } from '../address/address.module';
import { UnitModule } from '../units/unit.module';

let modules = [
  UserModule, AddressModule, UnitModule
];

import { ClientRoutingModule } from './client.routes';

import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientSelectComponent } from './client-select/client-select.component';

let declarations = [
    ClientListComponent,
    ClientDetailComponent,
    ClientNewComponent, ClientSelectComponent,
];

import { ClientService } from './client.service';
import { ClientListResolve } from './client-list-resolve.service';
import { ClientDetailResolve } from './client-detail-resolve.service';

let services = [
  ClientService, ClientListResolve, ClientDetailResolve,
];

@NgModule({
  imports: [ CommonModule, FormsModule, ClientRoutingModule, 
    modules 
  ],
  declarations: [ declarations ],
  providers: [
    ...services
  ],
  exports: [ declarations ]
})
export class ClientModule { }
