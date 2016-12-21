import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

/* Feature Modules */

let modules = [
  
];

import { ServiceRoutingModule } from './service.routes';
import { ServiceComponent } from './service.component';

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

import { ServiceService } from './service.service';
import { ServiceListResolve } from './service-list-resolve.service';
import { ServiceDetailResolve } from './service-detail-resolve.service';

let services = [
  ServiceService, ServiceListResolve, ServiceDetailResolve
];

@NgModule({
  imports: [ 
    ...modules, CommonModule, FormsModule, ServiceRoutingModule ],
  declarations: [ServiceComponent, 
    declarations
  ],
  providers: [
    ...services
  ],
  exports: [
    declarations
  ]
})
export class ServiceModule { }
