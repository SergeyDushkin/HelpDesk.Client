import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

/* Feature Modules */
import { FileModule } from '../file/file.module';
import { ClientModule } from './clients/client.module';
import { ContractModule } from './contracts/contract.module';
import { OperatorModule } from './operators/operator.module';
import { StatusModule } from './ticket-status/status.module';
import { UserModule } from './users/user.module';
import { AddressModule } from './address/address.module';
import { WorkModule } from './work/work.module';
import { TicketModule } from './tickets/ticket.module';
import { ServiceModule } from './service/service.module';

let modules = [
  FileModule, ClientModule, ContractModule, OperatorModule, StatusModule, UserModule, AddressModule, WorkModule, TicketModule, ServiceModule
];

import { ServiceDeskRoutingModule } from './service-desk.routes';

import { ServiceDeskComponent } from './service-desk.component';
import { TicketFileNewComponent } from './tickets/file-new/file-new.component';

import { TicketServiceApiService } from './ticket-service-api.service';

let services = [
  TicketServiceApiService
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
