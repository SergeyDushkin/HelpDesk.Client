import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../../guards/authentication-guard';

import { OperatorComponent } from './operator.component';

import { OperatorListComponent } from './operator-list/operator-list.component';
import { OperatorDetailComponent } from './operator-detail/operator-detail.component';
import { OperatorNewComponent } from './operator-new/operator-new.component';
import { OperatorListResolve } from './operator-list-resolve.service';
import { OperatorDetailResolve } from './operator-detail-resolve.service';

const routes: Routes = [
  { path: 'operators',
    component: OperatorComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: OperatorListComponent, canActivate: [AuthenticationGuard], resolve: { operators: OperatorListResolve } },
      { path: 'create', component: OperatorNewComponent, canActivate: [AuthenticationGuard] },
      { path: ':id', component: OperatorDetailComponent, canActivate: [AuthenticationGuard], resolve: { operator: OperatorDetailResolve } },
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
export class OperatorRoutingModule { }