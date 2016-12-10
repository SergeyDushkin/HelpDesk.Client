import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetailComponent implements OnInit {

  ticket: Ticket;

  constructor(private location: Location, private route: ActivatedRoute) { 
    this.ticket = new Ticket();
  }

  ngOnInit() {
    this.ticket = this.route.snapshot.data['ticket'];
  }

  onClickBack() {
    this.location.back();
  }

}
