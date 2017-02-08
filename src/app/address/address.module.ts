import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address.routes';

import { AddressComponent } from './address.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { AddressNewComponent } from './address-new/address-new.component';
import { AddressSelectComponent } from './address-select/address-select.component';

let declarations = [
    AddressListComponent,
    AddressDetailComponent,
    AddressNewComponent,
    AddressSelectComponent,
];

import { AddressService as ClientAddressService } from './address.service';
import { AddressListResolve } from './address-list-resolve.service';
import { AddressDetailResolve } from './address-detail-resolve.service';

let services = [
  ClientAddressService, AddressListResolve, AddressDetailResolve,
];

@NgModule({
  imports: [ CommonModule, FormsModule, AddressRoutingModule ],
  declarations: [ AddressComponent, declarations ],
  providers: [
    ...services
  ],
  exports: [ declarations ]
})
export class AddressModule { }
