import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyDetailResolve } from './company-detail-resolve.service';

const routes: Routes = [
  { path: 'company', component: CompanyDetailComponent, resolve: { company: CompanyDetailResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }