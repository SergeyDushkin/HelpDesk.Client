import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Priority } from '../priority';

@Component({
  selector: 'app-ticket-priority-list',
  templateUrl: './priority-list.component.html'
})
export class PriorityListComponent implements OnInit {

  private data : Priority[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['ticket-priority'];
  }

}
