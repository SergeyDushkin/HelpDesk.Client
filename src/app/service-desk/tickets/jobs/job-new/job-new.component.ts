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
    let ticket_id = this.route.snapshot.params["ticket_id"];
    
    this.service.create(ticket_id, this.job).subscribe(
      (response) => this.router.navigate(['/service/tickets/' + ticket_id]),
      (err) => console.log("JobService update: error " + err),
      () => console.log("JobService update done"));
  }

}
