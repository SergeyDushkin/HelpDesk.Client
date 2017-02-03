import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

/* Feature Modules */
import { ClientModule } from '../clients/client.module';

let modules = [
  ClientModule
];

import { ContractRoutingModule } from './contract.routes';
import { ContractComponent } from './contract.component';

import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractNewComponent } from './contract-new/contract-new.component';

let declarations = [
    ContractListComponent,
    ContractDetailComponent,
    ContractNewComponent,
];

import { TicketServiceApiService } from '../services/ticket-service-api.service';
import { ContractService } from './contract.service';
import { ContractListResolve } from './contract-list-resolve.service';
import { ContractDetailResolve } from './contract-detail-resolve.service';

let services = [
  TicketServiceApiService,
  ContractService, ContractListResolve, ContractDetailResolve
];

@NgModule({
  imports: [ 
    ...modules, CommonModule, FormsModule, ContractRoutingModule ],
  declarations: [
    ContractComponent, 
    declarations
  ],
  providers: [
    ...services
  ],
  exports: [
    declarations
  ]
})
export class ContractModule { }
