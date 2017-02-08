import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServiceNewComponent } from './service-new/service-new.component';
import { ServiceListResolve } from './service-list-resolve.service';
import { ServiceDetailResolve } from './service-detail-resolve.service';

const routes: Routes = [
  { path: 'services', component: ServiceListComponent, resolve: { services: ServiceListResolve } },
  { path: 'services/create', component: ServiceNewComponent },
  { path: 'services/:id', component: ServiceDetailComponent, resolve: { service: ServiceDetailResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }