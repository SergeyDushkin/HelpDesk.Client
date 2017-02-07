import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority } from '../priority';
import { prioritieservice } from '../priority.service';

@Component({
  selector: 'app-ticket-priority-detail',
  templateUrl: './priority-detail.component.html'
})
export class PriorityDetailComponent implements OnInit {

  private data : Priority;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: prioritieservice) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['ticket-priority'];
  }

  onClickBack() {
    this.location.back();
  }

  onDelete() {
    this.service.delete(this.data.id).subscribe(
      (response) => this.router.navigate(['/ticket-priorities']),
      (err) => console.log("prioritiestatusService delete: error " + err),
      () => console.log("prioritiestatusService delete done"));
  }

  onUpdate() {
    this.service.update(this.data).subscribe(
      (response) => this.router.navigate(['/ticket-priorities']),
      (err) => console.log("prioritieservice update: error " + err),
      () => console.log("prioritiestatusService update done"));
  }

}
