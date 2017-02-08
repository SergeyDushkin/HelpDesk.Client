import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../status';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-ticket-status-detail',
  templateUrl: './status-detail.component.html'
})
export class StatusDetailComponent implements OnInit {

  private data : Status;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: StatusService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['ticket-status'];
  }

  onClickBack() {
    this.location.back();
  }

  onDelete() {
    this.service.delete(this.data.id).subscribe(
      (response) => this.router.navigate(['/ticket-statuses']),
      (err) => console.log("TicketStatusService delete: error " + err),
      () => console.log("TicketStatusService delete done"));
  }

  onUpdate() {
    this.service.update(this.data).subscribe(
      (response) => this.router.navigate(['/ticket-statuses']),
      (err) => console.log("TicketStatusService update: error " + err),
      () => console.log("TicketStatusService update done"));
  }

}
