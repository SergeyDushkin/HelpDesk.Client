import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '../file';
import { FileService } from '../file.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-file-new',
  templateUrl: './file-new.component.html'
})
export class FileNewComponent implements OnInit {

  @Input('resource') resource : string;
  @Input('referenceId') referenceId : string;

  public uploader:FileUploader;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  private file : File;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: FileService) { }

  ngOnInit() {
    this.file = new File();
    
    //var headers : any[] = new Array<any>();
    //for(var value in this.apiService.getHeaders().toJSON()) {
    //  headers.push({ name : value, value : this.apiService.getHeaders().toJSON()[value][0]});
    //}

    this.uploader = new FileUploader({url: this.service.getBaseUrl() + "files/?resource=" + this.resource + '&referenceId=' + this.referenceId }); //, headers: headers 
  }

}
