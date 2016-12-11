import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { ServiceDeskComponent } from './service-desk.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketNewComponent } from './tickets/ticket-new/ticket-new.component';

const routes: Routes = [
  { path: 'service',
    component: ServiceDeskComponent,
    children: [
      { path: 'tickets',    component: TicketListComponent },
      { path: 'tickets/:id', component: TicketDetailComponent }
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