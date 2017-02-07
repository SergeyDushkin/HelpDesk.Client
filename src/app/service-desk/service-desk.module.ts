import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

/* Feature Modules */
import { FileModule } from '../file/file.module';
import { ClientModule } from '../clients/client.module';
import { OperatorModule } from './operators/operator.module';
import { StatusModule } from './tickets/status/status.module';
import { UserModule } from '../users/user.module';
import { WorkModule } from '../works/work/work.module';

let modules = [
  FileModule, ClientModule, OperatorModule, StatusModule, UserModule, WorkModule,
];

import { ServiceDeskRoutingModule } from './service-desk.routes';

import { ServiceDeskComponent } from './service-desk.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketNewComponent } from './tickets/ticket-new/ticket-new.component';
import { TicketFileNewComponent } from './tickets/file-new/file-new.component';


import { TicketService } from './tickets/ticket.service';
import { TicketListResolve } from './tickets/ticket-list-resolve.service';
import { TicketDetailResolve } from './tickets/ticket-detail-resolve.service';

let services = [
  TicketService, TicketListResolve, TicketDetailResolve
];

@NgModule({
  imports: [ 
    ...modules, 
    CommonModule, FormsModule, ServiceDeskRoutingModule 
  ],
  declarations: [
    ServiceDeskComponent, 
    TicketListComponent, TicketDetailComponent, TicketNewComponent, TicketFileNewComponent,
  ],
  providers: [
    ...services
  ]
})
export class ServiceDeskModule { }
