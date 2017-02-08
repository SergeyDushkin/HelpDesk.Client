import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { UnitComponent } from './unit.component';

import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { UnitNewComponent } from './unit-new/unit-new.component';
import { UnitListResolve } from './unit-list-resolve.service';
import { UnitDetailResolve } from './unit-detail-resolve.service';

const routes: Routes = [
  { path: ':resource/:referenceId/units',
    component: UnitComponent, 
    children: [
      { path: '', component: UnitListComponent, resolve: { units: UnitListResolve } },
      { path: 'create', component: UnitNewComponent },
      { path: ':id', component: UnitDetailComponent, resolve: { units: UnitDetailResolve } }
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
export class UnitRoutingModule { }