import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { PriorityComponent } from './priority.component';

import { PriorityListComponent } from './priority-list/priority-list.component';
import { PriorityDetailComponent } from './priority-detail/priority-detail.component';
import { PriorityNewComponent } from './priority-new/priority-new.component';
import { PriorityListResolve } from './priority-list-resolve.service';
import { PriorityDetailResolve } from './priority-detail-resolve.service';

const routes: Routes = [
  { path: 'ticket-priorities',
    component:  PriorityComponent, 
    children: [
      { path: '', component:  PriorityListComponent, resolve: { 'ticket-priority': PriorityListResolve } },
      { path: 'create', component:  PriorityNewComponent, },
      { path: ':ticket_priority_id', component:  PriorityDetailComponent, resolve: { 'ticket-priority': PriorityDetailResolve } },  
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
export class PriorityRoutingModule { }