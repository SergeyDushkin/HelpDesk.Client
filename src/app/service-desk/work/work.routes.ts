import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { WorkListComponent } from './work-list/work-list.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { WorkNewComponent } from './work-new/work-new.component';
import { WorkListResolve } from './work-list-resolve.service';
import { WorkDetailResolve } from './work-detail-resolve.service';

const routes: Routes = [
  { path: ':resource/:referenceId/works', component: WorkListComponent, resolve: { works: WorkListResolve } },
  { path: ':resource/:referenceId/works/create', component: WorkNewComponent },
  { path: ':resource/:referenceId/works/:id', component: WorkDetailComponent, resolve: { work: WorkDetailResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WorkRoutingModule { }