import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';
         
import { SelectComponent } from 'ng2-select/ng2-select';

import { ServiceDeskRoutingModule } from './service-desk.routes';

import { ClientSelectComponent } from './clients/client-select/client-select.component';

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
  imports: [ CommonModule, FormsModule, ServiceDeskRoutingModule ],
  declarations: [ServiceDeskComponent, 
    TicketListComponent, TicketDetailComponent, TicketNewComponent,
    ClientSelectComponent,
    SelectComponent,
  ],
  providers: [
    ...services
  ]
})
export class ServiceDeskModule { }
