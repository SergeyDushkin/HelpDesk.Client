import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit {

  private jobs : Job[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.jobs = this.route.snapshot.data['jobs'];
  }

}
