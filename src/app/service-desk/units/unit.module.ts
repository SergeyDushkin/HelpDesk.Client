import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit.routes';

import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { UnitNewComponent } from './unit-new/unit-new.component';
import { UnitSelectComponent } from './unit-select/unit-select.component';

let declarations = [
    UnitListComponent,
    UnitDetailComponent,
    UnitNewComponent,
    UnitSelectComponent,
];

import { UnitService as ClientUnitService } from './unit.service';
import { UnitListResolve } from './unit-list-resolve.service';
import { UnitDetailResolve } from './unit-detail-resolve.service';

let services = [
  ClientUnitService, UnitListResolve, UnitDetailResolve,
];

@NgModule({
  imports: [ CommonModule, FormsModule, UnitRoutingModule ],
  declarations: [ declarations ],
  providers: [
    ...services
  ],
  exports: [ declarations ]
})
export class UnitModule { }
