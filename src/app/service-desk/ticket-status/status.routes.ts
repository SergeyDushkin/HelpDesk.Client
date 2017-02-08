import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { StatusComponent } from './status.component';

import { StatusListComponent } from './status-list/status-list.component';
import { StatusDetailComponent } from './status-detail/status-detail.component';
import { StatusNewComponent } from './status-new/status-new.component';
import { StatusListResolve } from './status-list-resolve.service';
import { StatusDetailResolve } from './status-detail-resolve.service';

const routes: Routes = [
  { path: 'ticket-statuses',
    component:  StatusComponent, 
    children: [
      { path: '', component:  StatusListComponent, resolve: { 'ticket-status': StatusListResolve } },
      { path: 'create', component:  StatusNewComponent, },
      { path: ':ticket_status_id', component:  StatusDetailComponent, resolve: { 'ticket-status': StatusDetailResolve } },  
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
export class StatusRoutingModule { }