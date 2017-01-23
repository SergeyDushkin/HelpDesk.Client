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
  private ticket_id : any;
  private statusUri : string;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: JobService) { }

  ngOnInit() {
    this.job = this.route.snapshot.data['job'];
    this.ticket_id = this.route.snapshot.params["ticket_id"];
    this.statusUri =  `tickets/${this.ticket_id}/jobs/${this.job.id}/status`;
  }

  onClickBack() {
    this.location.back();
  }

  onDelete() {

    this.service.delete(this.ticket_id, this.job.id).subscribe(
      (response) => this.router.navigate(['/service/tickets/' + this.ticket_id]),
      (err) => console.log("SupplierService delete: error " + err),
      () => console.log("SupplierService delete done"));
  }

  onUpdate() {
    
    this.service.update(this.ticket_id, this.job).subscribe(
      (response) => this.router.navigate(['/service/tickets/' + this.ticket_id]),
      (err) => console.log("JobService update: error " + err),
      () => console.log("JobService update done"));
  }

}
