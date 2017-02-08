import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

/* Feature Modules */
import { UserModule } from '../users/user.module';
import { AddressModule } from '../address/address.module';

let modules = [
  UserModule, AddressModule
];

import { ClientRoutingModule } from './client.routes';
import { ClientComponent } from './client.component';

import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientSelectComponent } from './client-select/client-select.component';

import { UnitListComponent } from './units/unit-list/unit-list.component';
import { UnitDetailComponent } from './units/unit-detail/unit-detail.component';
import { UnitNewComponent } from './units/unit-new/unit-new.component';
import { UnitSelectComponent } from './units/unit-select/unit-select.component';

let declarations = [
    ClientListComponent,
    ClientDetailComponent,
    ClientNewComponent, ClientSelectComponent,
    UnitListComponent,
    UnitDetailComponent,
    UnitNewComponent,
    UnitSelectComponent
];

import { ClientService } from './client.service';
import { ClientListResolve } from './client-list-resolve.service';
import { ClientDetailResolve } from './client-detail-resolve.service';

import { UnitService } from './units/unit.service';
import { UnitListResolve } from './units/unit-list-resolve.service';
import { UnitDetailResolve } from './units/unit-detail-resolve.service';

let services = [
  ClientService, ClientListResolve, ClientDetailResolve,
  UnitService, UnitListResolve, UnitDetailResolve,
];

@NgModule({
  imports: [ CommonModule, FormsModule, ClientRoutingModule, 
    modules 
  ],
  declarations: [ClientComponent, 
    declarations
  ],
  providers: [
    ...services
  ],
  exports: [
    declarations
  ]
})
export class ClientModule { }
