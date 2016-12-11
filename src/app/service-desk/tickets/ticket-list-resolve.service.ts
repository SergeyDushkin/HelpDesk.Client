import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket';

@Injectable()
export class TicketListResolve implements Resolve<Ticket[]> {

  constructor(private route: ActivatedRoute, private service : TicketService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.get()
      .toPromise()
      .then(data => data);
  }

}
