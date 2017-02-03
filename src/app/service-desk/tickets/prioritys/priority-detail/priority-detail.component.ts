import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority } from '../priority';
import { PriorityService } from '../priority.service';

@Component({
  selector: 'app-ticket-priority-detail',
  templateUrl: './priority-detail.component.html'
})
export class PriorityDetailComponent implements OnInit {

  private data : Priority;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: PriorityService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['ticket-priority'];
  }

  onClickBack() {
    this.location.back();
  }

  onDelete() {
    this.service.delete(this.data.id).subscribe(
      (response) => this.router.navigate(['/ticket-prioritys']),
      (err) => console.log("PriorityStatusService delete: error " + err),
      () => console.log("PriorityStatusService delete done"));
  }

  onUpdate() {
    this.service.update(this.data).subscribe(
      (response) => this.router.navigate(['/ticket-prioritys']),
      (err) => console.log("PriorityService update: error " + err),
      () => console.log("PriorityStatusService update done"));
  }

}
