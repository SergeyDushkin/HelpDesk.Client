import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../status';

@Component({
  selector: 'app-ticket-status-list',
  templateUrl: './status-list.component.html'
})
export class StatusListComponent implements OnInit {

  private data : Status[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['ticket-status'];
  }
  
  trackById(index, item) {
    return item.id;
  }

}
