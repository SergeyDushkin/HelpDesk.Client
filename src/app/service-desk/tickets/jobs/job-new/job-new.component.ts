import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-new',
  templateUrl: './job-new.component.html'
})
export class JobNewComponent implements OnInit {

  private job : Job;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: JobService) { }

  ngOnInit() {
    this.job = new Job();
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    let tickets_id = this.route.snapshot.params["tickets_id"];
    
    this.service.create(tickets_id, this.job).subscribe(
      (response) => this.router.navigate(['/service/tickets/' + tickets_id]),
      (err) => console.log("JobService update: error " + err),
      () => console.log("JobService update done"));
  }

}
