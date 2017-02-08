import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

/* Feature Modules */

let modules = [
  
];

import { PriorityRoutingModule } from './priority.routes';
import { PriorityComponent } from './priority.component';

import { PriorityListComponent } from './priority-list/priority-list.component';
import { PriorityDetailComponent } from './priority-detail/priority-detail.component';
import { PriorityNewComponent } from './priority-new/priority-new.component';
import { PrioritySelectComponent } from './priority-select/priority-select.component';

let declarations = [
    PriorityListComponent,
    PriorityDetailComponent,
    PriorityNewComponent,
];

import { PriorityService } from './priority.service';
import { PriorityListResolve } from './priority-list-resolve.service';
import { PriorityDetailResolve } from './priority-detail-resolve.service';

let services = [
  PriorityService, PriorityListResolve, PriorityDetailResolve
];

@NgModule({
  imports: [ 
    ...modules, CommonModule, FormsModule, PriorityRoutingModule ],
  declarations: [
    PriorityComponent, 
    declarations
  ],
  providers: [
    ...services
  ],
  exports: [
    declarations
  ]
})
export class PriorityModule { }
