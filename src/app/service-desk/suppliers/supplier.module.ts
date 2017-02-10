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

import { SupplierRoutingModule } from './supplier.routes';
import { SupplierComponent } from './supplier.component';

import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierNewComponent } from './supplier-new/supplier-new.component';
import { SupplierSelectComponent } from './supplier-select/supplier-select.component';

let declarations = [

    SupplierListComponent,
    SupplierDetailComponent,
    SupplierNewComponent,
    SupplierSelectComponent,
];

import { SupplierService } from './supplier.service';
import { SupplierListResolve } from './supplier-list-resolve.service';
import { SupplierDetailResolve } from './supplier-detail-resolve.service';

let services = [
  SupplierService, SupplierListResolve, SupplierDetailResolve
];

@NgModule({
  imports: [ 
    ...modules, CommonModule, FormsModule, SupplierRoutingModule ],
  declarations: [SupplierComponent, 
    declarations
  ],
  providers: [
    ...services
  ],
  exports: [
    declarations, UserModule
  ]
})
export class SupplierModule { }
