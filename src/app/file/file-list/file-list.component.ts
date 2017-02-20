import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file.service';
import { File } from '../file';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html'
})
export class FileListComponent implements OnInit {

  @Input('resource') resource : string;
  @Input('referenceId') referenceId : string;

  private files : File[];

  constructor(private route: ActivatedRoute, private fileService: FileService) { }

  onClick(file : File) {
    this.fileService.download(this.resource, this.referenceId, file.id);
  }

  ngOnInit() {
    this.fileService.get(this.resource, this.referenceId).toPromise().then(r => this.files = r);
  }

}
