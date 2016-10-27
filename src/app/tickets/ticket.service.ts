import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Ticket } from './ticket';
import { RequestService } from '../services/request.service';

@Injectable()
export class TicketService {

  constructor(private http: Http, private requestService : RequestService) { 
  }

  getTicketById(id : string) : Observable<Ticket> {
    
    return this.requestService.get("/api/tickets/?id=" + id)
      .map(r => r.json().Data)
      .map(item => this.extractData(item));
  }

  getArchivedTickets() : Observable<Ticket[]> {
    
    return this.requestService
      .get("api/tickets/archived/?$orderby=RequestDate desc")
      .map(r => r.json().Data.map(item => this.extractData(item)));
  }

  getTickets() : Observable<Ticket[]> {
    
    return this.requestService
      .get("api/tickets/?$orderby=RequestDate desc")
      .map(r => r.json().Data.map(item => this.extractData(item)));
  }

  createTicket(ticket : any) : Observable<Ticket> {
    
    return this.requestService.post("api/tickets/", ticket)
      .map(r => r.json().Data)
      .map(item => this.extractData(item));
  }

  extractData(item : any) : Ticket{
    return new Ticket({ 
        id: item.Id, 
        store: item.StoreName, 
        comments: item.Comments,
        number: item.TicketNumber,
        startDate: item.RequestDate, 
        endDate: item.CompleteDate });
  }

}
