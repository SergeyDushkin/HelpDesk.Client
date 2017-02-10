import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

/* Feature Modules */

let modules = [
  
];

import { StatusRoutingModule } from './status.routes';

import { StatusListComponent } from './status-list/status-list.component';
import { StatusDetailComponent } from './status-detail/status-detail.component';
import { StatusNewComponent } from './status-new/status-new.component';
import { WorkStatusSelectComponent } from './select/status-select.component';

let declarations = [
    StatusListComponent,
    StatusDetailComponent,
    StatusNewComponent,
    WorkStatusSelectComponent
];

import { WorkStatusService } from './status.service';
import { StatusListResolve } from './status-list-resolve.service';
import { StatusDetailResolve } from './status-detail-resolve.service';

let services = [
  WorkStatusService, StatusListResolve, StatusDetailResolve
];

@NgModule({
  imports: [ 
    ...modules, CommonModule, FormsModule, StatusRoutingModule ],
  declarations: [ declarations ],
  providers: [
    ...services
  ],
  exports: [
    declarations
  ]
})
export class WorkStatusModule { }
