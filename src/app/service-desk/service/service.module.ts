import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service.routes';

import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServiceNewComponent } from './service-new/service-new.component';
import { ServiceSelectComponent } from './service-select/service-select.component';

let declarations = [
    ServiceListComponent,
    ServiceDetailComponent,
    ServiceNewComponent,
    ServiceSelectComponent,
];

import { ServiceService as ClientServiceService } from './service.service';
import { ServiceListResolve } from './service-list-resolve.service';
import { ServiceDetailResolve } from './service-detail-resolve.service';

let services = [
  ClientServiceService, ServiceListResolve, ServiceDetailResolve,
];

@NgModule({
  imports: [ CommonModule, FormsModule, ServiceRoutingModule ],
  declarations: [ declarations ],
  providers: [
    ...services
  ],
  exports: [ declarations ]
})
export class ServiceModule { }
