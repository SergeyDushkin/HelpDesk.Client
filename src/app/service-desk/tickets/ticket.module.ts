import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Feature Modules */
import { FileModule } from '../../file/file.module';
import { WorkModule } from '../work/work.module';;
import { StatusModule } from '../ticket-status/status.module';
import { PriorityModule } from '../ticket-priority/priority.module';
import { ClientModule } from '../clients/client.module';
import { AddressModule } from '../address/address.module';
import { UserModule } from '../users/user.module';
import { ContractModule } from '../contracts/contract.module';

let modules = [
  FileModule, WorkModule, StatusModule, ClientModule, AddressModule, PriorityModule, UserModule, ContractModule
];

import { TicketRoutingModule } from './ticket.routes';

import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketNewComponent } from './ticket-new/ticket-new.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';

let declarations = [
    TicketListComponent,
    TicketDetailComponent,
    TicketNewComponent,
    TicketEditComponent
];

import { TicketService } from './ticket.service';
import { TicketListResolve } from './ticket-list-resolve.service';
import { TicketDetailResolve } from './ticket-detail-resolve.service';

let services = [
  TicketService, TicketListResolve, TicketDetailResolve,
];

@NgModule({
  imports: [ CommonModule, FormsModule, TicketRoutingModule, modules ],
  declarations: [ declarations ],
  providers: [
    ...services
  ],
  exports: [ declarations ]
})
export class TicketModule { }
