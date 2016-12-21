import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket';

@Injectable()
export class TicketDetailResolve implements Resolve<Ticket> {

  constructor(private route: ActivatedRoute, private service : TicketService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params[route.data["parent"]])
      .toPromise()
      .then(data => data);
  }

}
