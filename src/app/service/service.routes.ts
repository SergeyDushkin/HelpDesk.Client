import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../guards/authentication-guard';

import { ServiceComponent } from './service.component';

import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServiceNewComponent } from './service-new/service-new.component';
import { ServiceListResolve } from './service-list-resolve.service';
import { ServiceDetailResolve } from './service-detail-resolve.service';

const routes: Routes = [
  { path: 'services',
    component:  ServiceComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component:  ServiceListComponent, canActivate: [AuthenticationGuard], resolve: {  service:  ServiceListResolve } },
      { path: 'create', component:  ServiceNewComponent, canActivate: [AuthenticationGuard] },
      { path: ':service_id', component:  ServiceDetailComponent, canActivate: [AuthenticationGuard], resolve: { service:  ServiceDetailResolve } },  
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
export class ServiceRoutingModule { }