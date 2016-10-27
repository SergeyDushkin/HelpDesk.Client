import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-ticket-arch-list',
  templateUrl: './ticket-arch-list.component.html',
  styleUrls: ['./ticket-arch-list.component.css'],
  providers: [TicketService]
})
export class TicketArchListComponent implements OnInit {

  tickets: Ticket[];
  
  constructor(private ticketService : TicketService) { }

  ngOnInit() {
    this.ticketService.getArchivedTickets().subscribe(r => {
      this.tickets = r;
    });
  }

}
