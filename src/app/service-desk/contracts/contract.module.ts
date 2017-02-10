import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

/* Feature Modules */
let modules = [
];

import { ContractRoutingModule } from './contract.routes';

import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractSelectComponent } from './contract-select/contract-select.component';
import { ContractNewComponent } from './contract-new/contract-new.component';

let declarations = [
    ContractListComponent,
    ContractDetailComponent,
    ContractNewComponent,
    ContractSelectComponent,
];

import { ContractService } from './contract.service';
import { ContractListResolve } from './contract-list-resolve.service';
import { ContractDetailResolve } from './contract-detail-resolve.service';

let services = [
  ContractService, ContractListResolve, ContractDetailResolve
];

@NgModule({
  imports: [ 
    ...modules, CommonModule, FormsModule, ContractRoutingModule ],
  declarations: [ declarations ],
  providers: [ ...services ],
  exports: [ declarations ]
})
export class ContractModule { }
