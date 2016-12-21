import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { File } from '../file';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html'
})
export class FileListComponent implements OnInit {

  private files : File[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.files = this.route.snapshot.data['files'];
  }

}
