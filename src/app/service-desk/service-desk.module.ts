import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { ServiceDeskRoutingModule } from './service-desk.routes';

import { ServiceDeskComponent } from './service-desk.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketNewComponent } from './tickets/ticket-new/ticket-new.component';

import { TicketService } from './tickets/ticket.service';
import { TicketListResolve } from './tickets/ticket-list-resolve.service';
import { TicketDetailResolve } from './tickets/ticket-detail-resolve.service';

let services = [
  TicketService, TicketListResolve, TicketDetailResolve
];

@NgModule({
  imports: [ CommonModule, ServiceDeskRoutingModule ],
  declarations: [ServiceDeskComponent, TicketListComponent, TicketDetailComponent, TicketNewComponent],
  providers: [
    ...services
  ]
})
export class ServiceDeskModule { }
