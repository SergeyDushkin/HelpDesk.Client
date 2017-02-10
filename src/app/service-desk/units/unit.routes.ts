import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { UnitNewComponent } from './unit-new/unit-new.component';
import { UnitListResolve } from './unit-list-resolve.service';
import { UnitDetailResolve } from './unit-detail-resolve.service';

const routes: Routes = [
  { path: ':resource/:referenceId/units', component: UnitListComponent, resolve: { units: UnitListResolve } },
  { path: ':resource/:referenceId/units/create', component: UnitNewComponent },
  { path: ':resource/:referenceId/units/:id', component: UnitDetailComponent, resolve: { unit: UnitDetailResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UnitRoutingModule { }