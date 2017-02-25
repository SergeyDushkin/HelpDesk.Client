import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../services/config.service';
import { File } from './file';

@Injectable()
export class FileService {

  constructor(private http: Http, private configService : ConfigService) { }

  public getBaseUrl = () => this.configService.get("APP_DRIVE_SERVICE_API_URI");

  getById(resource: string, referenceId: string, id : string) : Observable<File> {
    
    return this.http.get(this.getBaseUrl() + "files/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  get(resource: string, referenceId: string) : Observable<File[]> {
    
    return this.http.get(this.getBaseUrl() + "files/?resource=" + resource + '&referenceId=' + referenceId)
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  create(resource: string, referenceId: string, file : File) : Observable<File> {
    
    return this.http.post(this.getBaseUrl() + "files/?resource=" + resource + '&referenceId=' + referenceId, file)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  delete(resource: string, referenceId: string, id : string) : Observable<Response> {
    
    return this.http.delete(this.getBaseUrl() + "files/" +id);
  }

  download(resource: string, referenceId: string, id : string) {

    window.location.href = this.getBaseUrl() + "files/" + id + "/download?postback=true";

    //return this.http.get(this.getBaseUrl() + "files/" + id + "/download?postback=true")
    //  .map(r => r.json())
    //  .toPromise()
    //  .then(r => {
    //    window.location.href = this.getBaseUrl() + r.url
    //  });
  }

  extractData(item : any) : File {
    
    return new File({ 
        id: item.id, 
        name: item.name,
        contentType: item.contentType,
        fileType: item.fileType,
        size: (item.size / 1000).toFixed(2), 
        icon: this.icons(item.fileType),
        fileImg:this.fileImgs(item.fileType, item.id),
        fileIcon:this.fileIcons(item.fileType),
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

   fileImgs (format: string, id: string) {
      var img = "";      
    switch (format) {
            case "image/jpeg":
            img = this.getBaseUrl() + "files/" + id + "/download?size=M";
            break;
            case "image/png":
            img = this.getBaseUrl() + "files/" + id + "/download?size=M";
            break;      
      };  
     return img;
   }
   fileIcons (format: string) {
    var img = "";      
    switch (format) {
            case "image/jpeg":
            img = "";
            break;
            case "image/png":
            img = "";
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
