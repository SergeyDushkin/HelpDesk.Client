import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit {

  private job : Job;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: JobService) { }

  ngOnInit() {
    this.job = this.route.snapshot.data['job'];
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    let ticket_id = this.route.snapshot.params["ticket_id"];
    
    this.service.update(ticket_id, this.job).subscribe(
      (response) => this.router.navigate(['/service/tickets/' + ticket_id]),
      (err) => console.log("JobService update: error " + err),
      () => console.log("JobService update done"));
  }

}
