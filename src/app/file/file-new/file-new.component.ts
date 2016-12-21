import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '../file';
import { FileService } from '../file.service';
import { FileUploader } from 'ng2-file-upload';
import { BaseApiService } from '../../services/base-api.service';

@Component({
  selector: 'app-file-new',
  templateUrl: './file-new.component.html'
})
export class FileNewComponent implements OnInit {

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

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private apiService : BaseApiService, private service: FileService) { }

  ngOnInit() {
    this.file = new File();
    //this.apiService.getHeaders().values()
    this.uploader = new FileUploader({url: this.apiService.getBaseUrl() + "tickets/" + this.route.params[this.route.data["referenceKey"]] + "/files/", headers: null });
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.createFile(this.route.params[this.route.data["referenceKey"]], this.file).subscribe(
      (response) => this.router.navigate(['/files/']),
      (err) => console.log("FileService update: error " + err),
      () => console.log("FileService update done"));
  }

}
