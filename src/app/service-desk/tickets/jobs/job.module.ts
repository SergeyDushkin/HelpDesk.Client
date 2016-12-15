import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

/* Feature Modules */
import { SupplierModule } from '../../../suppliers/supplier.module';
import { UserModule } from '../../../suppliers/users/user.module';

let modules = [
  SupplierModule,
  UserModule
];

import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobNewComponent } from './job-new/job-new.component';

import { JobService } from './job.service';
import { JobListResolve } from './job-list-resolve.service';
import { JobDetailResolve } from './job-detail-resolve.service';

let services = [
  JobService, JobListResolve, JobDetailResolve
];

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule, SupplierModule ],
  declarations: [ JobListComponent, JobDetailComponent, JobNewComponent ],
  providers: [
    ...services
  ],
  exports: [ JobListComponent, JobDetailComponent, JobNewComponent ]
})
export class JobModule { }
