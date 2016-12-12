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

const routes: Routes = [
  { path: 'service',
    component: ServiceDeskComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'tickets', component: TicketListComponent, resolve: { tickets: TicketListResolve } },
      { path: 'tickets/create', component: TicketNewComponent },
      { path: 'tickets/:ticket_id', component: TicketDetailComponent, resolve: { ticket: TicketDetailResolve } }
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