import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FileService } from './file.service';
import { File } from './file';

@Injectable()
export class FileListResolve implements Resolve<File[]> {

  constructor(private route: ActivatedRoute, private service : FileService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getFiles(route.params[route.data["referenceKey"]])
      .toPromise()
      .then(data => data);
  }

}
