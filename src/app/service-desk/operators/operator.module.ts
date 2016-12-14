import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { OperatorRoutingModule } from './operator.routes';
import { OperatorComponent } from './operator.component';

import { OperatorListComponent } from './operator-list/operator-list.component';
import { OperatorDetailComponent } from './operator-detail/operator-detail.component';
import { OperatorNewComponent } from './operator-new/operator-new.component';
import { OperatorSelectComponent } from './operator-select/operator-select.component';

let declarations = [

    OperatorListComponent,
    OperatorDetailComponent,
    OperatorNewComponent,
    OperatorSelectComponent,
];

import { OperatorService } from './operator.service';
import { OperatorListResolve } from './operator-list-resolve.service';
import { OperatorDetailResolve } from './operator-detail-resolve.service';

let services = [
  OperatorService, OperatorListResolve, OperatorDetailResolve
];

@NgModule({
  imports: [ CommonModule, FormsModule, OperatorRoutingModule ],
  declarations: [OperatorComponent, 
    declarations
  ],
  providers: [
    ...services
  ],
  exports: [
    declarations
  ]
})
export class OperatorModule { }
