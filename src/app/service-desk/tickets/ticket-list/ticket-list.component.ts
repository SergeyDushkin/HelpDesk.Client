import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html'
})
export class TicketListComponent implements OnInit {

  private tickets : Ticket[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.tickets = this.route.snapshot.data['tickets'];
  }

}
