import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractNewComponent } from './contract-new/contract-new.component';
import { ContractSelectComponent } from './contract-select/contract-select.component';
import { ContractListResolve } from './contract-list-resolve.service';
import { ContractDetailResolve } from './contract-detail-resolve.service';

const routes: Routes = [
  { path: 'contracts', component:  ContractListComponent, resolve: { contract: ContractListResolve } },
  { path: 'contracts/create', component:  ContractNewComponent },
  { path: 'contracts/:contract_id', component:  ContractDetailComponent, resolve: { contract: ContractDetailResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContractRoutingModule { }