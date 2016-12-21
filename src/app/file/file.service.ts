import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { File} from './file';
import { BaseApiService } from '../services/base-api.service';

@Injectable()
export class FileService {

  constructor(private apiService : BaseApiService) { 
  }

  getById(referenceId : string, id : string) : Observable<File> {
    
    return this.apiService.get("tickets/" + referenceId  + "/files/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  get(referenceId : string) : Observable<File[]> {
    
    return this.apiService.get("tickets/" + referenceId  + "/files/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  create(referenceId : string, file : File) : Observable<File> {
    
    return this.apiService.post("tickets/" + referenceId  + "/files/", file)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  update(referenceId : string, file : File) : Observable<File> {
    
    return this.apiService.put("tickets/" + referenceId  + "/files/" + file.id, file)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  delete(referenceId : string, id : string) : Observable<Response> {
    
    return this.apiService.delete("tickets/" + referenceId  + "/files/" + id);
  }

  download(referenceId : string, id : string, contentType : string) : Observable<Response> {

    return this.apiService.download("tickets/" + referenceId  + "/files/" + id + "/download", contentType);
  }

  extractData(item : any) : File {
    return new File({ 
        id: item.id, 
        name: item.name,
        contentType: item.contentType,
        fileType: item.fileType,
        size: item.size,
      });
  }
  
  private extractContent(res: Response) {
    let blob: Blob = res.blob();
    window['saveAs'](blob, 'test.pdf');
  }

}
