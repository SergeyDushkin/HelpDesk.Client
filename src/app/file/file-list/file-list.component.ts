import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file.service';
import { File } from '../file';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html'
})
export class FileListComponent implements OnInit {

  private files : File[];

  constructor(private route: ActivatedRoute, private fileService: FileService) { }

  onClick(file : File) {

    var referenceKey = this.route.snapshot.data["referenceKey"];
    var referenceId = this.route.snapshot.params[referenceKey];

    this.fileService.download(referenceId, file.id, file.contentType)
      .map(res => new Blob([res.blob],{ type: file.contentType }))
      .subscribe(
        data => window.open(window.URL.createObjectURL(data), file.name),
        error => console.log("Error downloading the file."),
        () => console.log('Completed file download.'));
  }

  ngOnInit() {
    this.files = this.route.snapshot.data['files'];
  }

}
