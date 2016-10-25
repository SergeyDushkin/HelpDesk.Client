import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Observable, ReplaySubject} from 'rxjs/Rx';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
  providers: [TicketService]
})
export class TicketDetailComponent implements OnInit {

  ticket: Ticket;

  constructor(private location: Location, private route: ActivatedRoute, private ticketService : TicketService) { 
    this.ticket = new Ticket();
  }

  ngOnInit() {

    this.route.params
      .map(param => param['id'])
      .switchMap(id => this.ticketService.getTicketById(id))
      .subscribe(ticket => this.ticket = ticket);
  }

  onClickBack() {
    this.location.back();
  }

}
