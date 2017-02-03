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
  { path: 'work-statuses',
    component:  StatusComponent, 
    children: [
      { path: '', component:  StatusListComponent, resolve: { 'work-status': StatusListResolve } },
      { path: 'create', component:  StatusNewComponent, },
      { path: ':work_status_id', component:  StatusDetailComponent, resolve: { 'work-status': StatusDetailResolve } },  
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