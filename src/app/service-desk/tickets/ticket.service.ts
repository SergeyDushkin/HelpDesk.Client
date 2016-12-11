import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Ticket } from './ticket';
import { BaseApiService } from '../../services/base-api.service';

@Injectable()
export class TicketService {

  constructor(private apiService : BaseApiService) { 
  }

  getById(id : string) : Observable<Ticket> {
    
    return this.apiService.get("tickets/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  get() : Observable<Ticket[]> {
    
    return this.apiService.get("tickets/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  create(ticket : Ticket) : Observable<Ticket> {
    
    return this.apiService.post("tickets/", ticket)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  update(ticket : Ticket) : Observable<Ticket> {
    
    return this.apiService.put("tickets/" + ticket.id, ticket)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  delete(id : string) : Observable<Response> {
    
    return this.apiService.delete("tickets/" + id);
  }

  extractData(item : any) : Ticket {
    return new Ticket({ 
        id: item.id, 
        ticketNumber:item.ticketNumber,
        clientId:item.clientId,
        addressId:item.addressId,
        userId:item.userId,
        description:item.description,
        requestDate:item.requestDate,
        completeDate:item.completeDate,
        client:item.client,
        address:item.address,
        user:item.user
      });
  }

}
