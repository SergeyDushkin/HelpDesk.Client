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
import { AddressModule } from '../address/address.module';
import { WorkModule } from '../work/work.module';
import { TicketModule } from './tickets/ticket.module';

let modules = [
  FileModule, ClientModule, OperatorModule, StatusModule, UserModule, AddressModule, WorkModule, TicketModule
];

import { ServiceDeskRoutingModule } from './service-desk.routes';

import { ServiceDeskComponent } from './service-desk.component';
import { TicketFileNewComponent } from './tickets/file-new/file-new.component';

let services = [
];

@NgModule({
  imports: [ 
    ...modules, 
    CommonModule, FormsModule, ServiceDeskRoutingModule 
  ],
  declarations: [
    ServiceDeskComponent, 
    TicketFileNewComponent,
  ],
  providers: [
    ...services
  ]
})
export class ServiceDeskModule { }
