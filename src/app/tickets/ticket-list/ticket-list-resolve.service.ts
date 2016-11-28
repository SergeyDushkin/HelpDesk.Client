import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';

@Injectable()
export class TicketListResolve implements Resolve<Ticket> {

  constructor(private route: ActivatedRoute, private ticketService : TicketService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.ticketService.getTickets()
      .toPromise()
      .then(data => data);
  }

}
