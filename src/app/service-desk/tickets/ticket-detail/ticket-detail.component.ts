import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetailComponent implements OnInit {

  private disabled: boolean = true;
  private ticket : Ticket;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: TicketService) { }

  ngOnInit() {
    this.ticket = this.route.snapshot.data['ticket'];
  }

  onUpdate() {
    this.service.update(this.ticket).subscribe(
      (response) => this.router.navigate(['/service/tickets/']),
      (err) => console.log("TicketService update: error " + err),
      () => console.log("TicketService update done"));
  }

}
