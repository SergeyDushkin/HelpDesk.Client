import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { StatusListComponent } from './status-list/status-list.component';
import { StatusDetailComponent } from './status-detail/status-detail.component';
import { StatusNewComponent } from './status-new/status-new.component';
import { StatusListResolve } from './status-list-resolve.service';
import { StatusDetailResolve } from './status-detail-resolve.service';

const routes: Routes = [
  { path: 'work-statuses', component:  StatusListComponent, resolve: { 'work-status': StatusListResolve } },
  { path: 'work-statuses/create', component:  StatusNewComponent },
  { path: 'work-statuses/:work_status_id', component:  StatusDetailComponent, resolve: { 'work-status': StatusDetailResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StatusRoutingModule { }