import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes,
         RouterModule } from '@angular/router';

/* Feature Modules */
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

let modules = [
  FileUploadModule
];

import { FileListComponent } from './file-list/file-list.component';
import { FileNewComponent } from './file-new/file-new.component';

let declarations = [
    FileListComponent, FileNewComponent,
];

import { FileService } from './file.service';
import { FileListResolve } from './file-list-resolve.service';

let services = [
  FileService, FileListResolve,
];

@NgModule({
  imports: [ 
    ...modules,
    CommonModule, FormsModule, RouterModule ],
  declarations: [ 
    ...declarations
  ],
  providers: [
    ...services
  ],
  exports: [
    declarations
  ]
})
export class FileModule { }
