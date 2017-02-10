import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketNewComponent } from './ticket-new/ticket-new.component';
import { TicketListResolve } from './ticket-list-resolve.service';
import { TicketDetailResolve } from './ticket-detail-resolve.service';

import { PriorityListResolve } from '../ticket-priority/priority-list-resolve.service';
import { StatusListResolve } from '../ticket-status/status-list-resolve.service';
import { ClientListResolve } from '../clients/client-list-resolve.service';

const routes: Routes = [
  { path: 'tickets', component: TicketListComponent, resolve: { tickets: TicketListResolve } },
  { path: 'tickets/create', component: TicketNewComponent, resolve: { 'ticket-priority': PriorityListResolve, 'ticket-status': StatusListResolve, 'client': ClientListResolve } },
  { path: 'tickets/:id', component: TicketDetailComponent, resolve: { ticket: TicketDetailResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TicketRoutingModule { }