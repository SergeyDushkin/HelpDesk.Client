import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { File} from './file';
import { BaseApiService } from '../services/base-api.service';

@Injectable()
export class FileService {

  constructor(private apiService : BaseApiService) { 
  }

  getFileById(referenceId : string, id : string) : Observable<File> {
    
    return this.apiService.get("tickets/" + referenceId  + "/files/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  getFiles(referenceId : string) : Observable<File[]> {
    
    return this.apiService.get("tickets/" + referenceId  + "/files/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  createFile(referenceId : string, file : File) : Observable<File> {
    
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

  extractData(item : any) : File {
    return new File({ 
        id: item.id, 
        name: item.name
      });
  }

}
