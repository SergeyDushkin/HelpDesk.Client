import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Work } from '../work';

@Component({
  selector: 'app-work-work-list',
  templateUrl: './work-list.component.html'
})
export class WorkListComponent implements OnInit {

  private data : Work[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['work-work'];
  }

}
