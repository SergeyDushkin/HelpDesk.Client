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

  download(referenceId : string, id : string) {

    return this.apiService.get("tickets/" + referenceId  + "/files/" + id + "/download/?postback=true")
      .map(r => r.json())
      .toPromise()
      .then(r => {
        window.location.href = this.apiService.getBaseUrl() + r.url
      });
  }

  extractData(item : any) : File {
    
    return new File({ 
        id: item.id, 
        name: item.name,
        contentType: item.contentType,
        fileType: item.fileType,
        size: (item.size / 1000).toFixed(2), 
        icon: this.icons(item.fileType),
        fileImg:this.fileImgs(item.fileType),
      });
  }
  
  private extractContent(res: Response) {
    let blob: Blob = res.blob();
    window['saveAs'](blob, 'test.pdf');
  }

    icons (format: string) {
    var icon = "";      
    switch (format) {
            case "image/jpeg":
            icon = "fa-camera";
            break;
            case "image/png":
            icon = "fa-camera";
            break;
            default:
            icon = "fa-paperclip";
      };  
     return icon;
  }

   fileImgs (format: string) {
    var img = "";      
    switch (format) {
            case "image/jpeg":
            img = "fa-file-image-o";
            break;
            case "image/png":
            img = "fa-file-image-o";
            break;
            case "application/zip":
            img = "fa-file-archive-o";
            break;
            case "application/pdf":
            img = "fa-file-pdf-o";
            break;
            case "application/vnd.ms-excel":
            img = "fa-file-excel-o";
            break;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            img = "fa-file-excel-o";
            break;
            case "application/msword":
            img = "fa-file-word-o";
            break;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            img = "fa-file-word-o";
            break;
            default:
            img = "fa-file-o";
      };  
     return img;
  }

}
