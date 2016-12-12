import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
//import { Client } from '../client';
//import { ClientService } from '../client.service';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html'
})
export class TicketNewComponent implements OnInit {

  private ticket : Ticket;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: TicketService) { }

  ngOnInit() {
    this.ticket = new Ticket();
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.ticket).subscribe(
      (response) => this.router.navigate(['/service/tickets/']),
      (err) => console.log("TicketService update: error " + err),
      () => console.log("TicketService update done"));
  }

}
