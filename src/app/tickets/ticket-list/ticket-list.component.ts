import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  providers: [TicketService]
})
export class TicketListComponent implements OnInit {
  
  Tickets: Ticket[];
  constructor(private ticketService : TicketService) { }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(r => {
      this.Tickets = r;
    });
  }

}
