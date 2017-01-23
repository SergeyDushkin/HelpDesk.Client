import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

import { StatusButtonComponent } from './status-button/status-button.component';

let declarations = [
    StatusButtonComponent,
];

import { StatusService } from './status.service';

let services = [
  StatusService,
];

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule ],
  declarations: [ 
    StatusButtonComponent
  ],
  providers: [
    ...services
  ],
  exports: [
    StatusButtonComponent
  ]
})
export class StatusModule { }
