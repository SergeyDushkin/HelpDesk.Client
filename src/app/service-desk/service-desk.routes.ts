import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../guards/authentication-guard';

import { ServiceDeskComponent } from './service-desk.component';

import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketNewComponent } from './tickets/ticket-new/ticket-new.component';

import { TicketListResolve } from './tickets/ticket-list-resolve.service';
import { TicketDetailResolve } from './tickets/ticket-detail-resolve.service';

import { TicketFileNewComponent } from './tickets/file-new/file-new.component';

import { ClientListResolve } from '../clients/client-list-resolve.service';
import { SupplierListResolve } from '../suppliers/supplier-list-resolve.service';
import { FileListResolve } from '../file/file-list-resolve.service';

import { StatusListResolve } from './tickets/status/status-list-resolve.service';
import { PriorityListResolve } from './tickets/priorities/priority-list-resolve.service';


const routes: Routes = [
  { path: 'service',
    component: ServiceDeskComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'tickets', component: TicketListComponent, resolve: { tickets: TicketListResolve } },
      { path: 'tickets/create', component: TicketNewComponent, resolve: { clients: ClientListResolve, 'ticket-status': StatusListResolve , 'ticket-priority': PriorityListResolve  } },
      { path: 'tickets/:ticket_id', component: TicketDetailComponent, 
        data : { parent : "ticket_id", referenceKey : "ticket_id" }, 
        resolve: { ticket: TicketDetailResolve, files: FileListResolve } }, //jobs: JobListResolve, 

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