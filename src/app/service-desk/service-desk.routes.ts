import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../guards/authentication-guard';

import { ServiceDeskComponent } from './service-desk.component';

import { TicketFileNewComponent } from './tickets/file-new/file-new.component';

const routes: Routes = [
  { path: 'service',
    component: ServiceDeskComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'tickets/:ticket_id/files/create', component: TicketFileNewComponent, data : { referenceKey : "ticket_id" } },
      //{ path: 'tickets/:ticket_id/jobs/create', component: JobNewComponent, resolve: { suppliers: SupplierListResolve } },
      //{ path: 'tickets/:ticket_id/jobs/:id', component: JobDetailComponent, data : { parent : "ticket_id" }, resolve: { job: JobDetailResolve } },  
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
export class ServiceDeskRoutingModule { }