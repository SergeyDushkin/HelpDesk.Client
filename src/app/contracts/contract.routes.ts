import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { ContractComponent } from './contract.component';

import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractNewComponent } from './contract-new/contract-new.component';
import { ContractListResolve } from './contract-list-resolve.service';
import { ContractDetailResolve } from './contract-detail-resolve.service';

const routes: Routes = [
  { path: 'contracts',
    component:  ContractComponent, 
    children: [
      { path: '', component:  ContractListComponent, resolve: { 'work-contract': ContractListResolve } },
      { path: 'create', component:  ContractNewComponent, },
      { path: ':work_contract_id', component:  ContractDetailComponent, resolve: { 'work-contract': ContractDetailResolve } },  
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContractRoutingModule { }