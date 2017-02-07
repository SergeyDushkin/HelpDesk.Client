import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

/* Feature Modules */
import { UserModule } from '../users/user.module';

let modules = [
  UserModule
];

import { ClientRoutingModule } from './client.routes';
import { ClientComponent } from './client.component';

import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientSelectComponent } from './client-select/client-select.component';

import { AddressListComponent } from './address/address-list/address-list.component';
import { AddressDetailComponent } from './address/address-detail/address-detail.component';
import { AddressNewComponent } from './address/address-new/address-new.component';
import { AddressSelectComponent } from './address/address-select/address-select.component';

import { UnitListComponent } from './units/unit-list/unit-list.component';
import { UnitDetailComponent } from './units/unit-detail/unit-detail.component';
import { UnitNewComponent } from './units/unit-new/unit-new.component';
import { UnitSelectComponent } from './units/unit-select/unit-select.component';

let declarations = [
    ClientListComponent,
    ClientDetailComponent,
    ClientNewComponent, ClientSelectComponent,
    AddressListComponent,
    AddressDetailComponent,
    AddressNewComponent,
    AddressSelectComponent,
    UnitListComponent,
    UnitDetailComponent,
    UnitNewComponent,
    UnitSelectComponent
];

import { ClientService } from './client.service';
import { ClientListResolve } from './client-list-resolve.service';
import { ClientDetailResolve } from './client-detail-resolve.service';

import { AddressService } from './address/address.service';
import { AddressListResolve } from './address/address-list-resolve.service';
import { AddressDetailResolve } from './address/address-detail-resolve.service';

import { UnitService } from './units/unit.service';
import { UnitListResolve } from './units/unit-list-resolve.service';
import { UnitDetailResolve } from './units/unit-detail-resolve.service';

let services = [
  ClientService, ClientListResolve, ClientDetailResolve,
  AddressService, AddressListResolve, AddressDetailResolve,
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
