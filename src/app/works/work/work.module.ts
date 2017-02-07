import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

/* Feature Modules */
import { SupplierModule } from '../../suppliers/supplier.module';
import { ClientModule } from '../../clients/client.module';
import { StatusModule } from '../status/status.module';

let modules = [
  StatusModule, 
  SupplierModule,
  ClientModule
];

import { WorkListComponent } from './work-list/work-list.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { WorkNewComponent } from './work-new/work-new.component';

let declarations = [
    WorkListComponent,
    WorkDetailComponent,
    WorkNewComponent,
];

import { TicketServiceApiService } from '../../services/ticket-service-api.service';
import { WorkService } from './work.service';
import { WorkListResolve } from './work-list-resolve.service';
import { WorkDetailResolve } from './work-detail-resolve.service';

let services = [
  TicketServiceApiService,
  WorkService, WorkListResolve, WorkDetailResolve
];

@NgModule({
  imports: [ 
    ...modules, CommonModule, FormsModule, RouterModule ],
  declarations: [
    declarations
  ],
  providers: [
    ...services
  ],
  exports: [
    declarations
  ]
})
export class WorkModule { }
