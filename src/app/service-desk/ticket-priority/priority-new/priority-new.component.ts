import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority } from '../priority';
import { PriorityService } from '../priority.service';

@Component({
  selector: 'app-ticket-priority-new',
  templateUrl: './priority-new.component.html'
})
export class PriorityNewComponent implements OnInit {

  private data : Priority;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: PriorityService) { }

  ngOnInit() {
    this.data = new Priority();
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.data).subscribe(
      (response) => this.router.navigate(['/ticket-prioritys']),
      (err) => console.log("TicketPriorityService create: error " + err),
      () => console.log("TicketPriorityService create done"));
  }

}
