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

import { JobListComponent } from './tickets/jobs/job-list/job-list.component';
import { JobDetailComponent } from './tickets/jobs/job-detail/job-detail.component';
import { JobNewComponent } from './tickets/jobs/job-new/job-new.component';

import { JobListResolve } from './tickets/jobs/job-list-resolve.service';
import { JobDetailResolve } from './tickets/jobs/job-detail-resolve.service';

import { ClientListResolve } from '../clients/client-list-resolve.service';
import { SupplierListResolve } from '../suppliers/supplier-list-resolve.service';

const routes: Routes = [
  { path: 'service',
    component: ServiceDeskComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'tickets', component: TicketListComponent, resolve: { tickets: TicketListResolve } },
      { path: 'tickets/create', component: TicketNewComponent, resolve: { clients: ClientListResolve } },
      { path: 'tickets/:ticket_id', component: TicketDetailComponent, resolve: { ticket: TicketDetailResolve } }, 

      { path: 'tickets/:ticket_id/jobs/', component: JobListComponent, resolve: { tickets: JobListResolve } },
      { path: 'tickets/:ticket_id/jobs/create', component: JobNewComponent, resolve: { suppliers: SupplierListResolve } },
      { path: 'tickets/:ticket_id/jobs/:id', component: JobDetailComponent, resolve: { ticket: JobDetailResolve } },  
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