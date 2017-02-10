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

import { CompanyRoutingModule } from './company.routes';

import { CompanyDetailComponent } from './company-detail/company-detail.component';

let declarations = [
    CompanyDetailComponent,
];

import { CompanyService } from './company.service';
import { CompanyDetailResolve } from './company-detail-resolve.service';

let services = [
  CompanyService, CompanyDetailResolve
];

@NgModule({
  imports: [ CommonModule, FormsModule, CompanyRoutingModule, ...modules ],
  declarations: [ declarations ],
  providers: [ ...services ],
  exports: [ declarations, UserModule ]
})
export class CompanyModule { }
