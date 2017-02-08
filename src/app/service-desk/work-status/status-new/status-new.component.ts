import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../status';
import { WorkStatusService } from '../status.service';

@Component({
  selector: 'app-work-status-new',
  templateUrl: './status-new.component.html'
})
export class StatusNewComponent implements OnInit {

  private data : Status;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: WorkStatusService) { }

  ngOnInit() {
    this.data = new Status();
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.data).subscribe(
      (response) => this.router.navigate(['/work-statuses']),
      (err) => console.log("WorkStatusService create: error " + err),
      () => console.log("WorkStatusService create done"));
  }

}
