import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Ticket } from './ticket';

@Injectable()
export class TicketService {

  constructor(private http: Http) { 

  }

  getTicketById(id : string) : Observable<Ticket> {
    
    var url = "/helpdesk-rzn/api/tickets/?id=" + id;

    var token = localStorage.getItem('token');
    var headers = new Headers();

    headers.append('Authorization', 'Bearer ' +  token);

    return this.http.get(url, { headers: headers })
      .map(r => r.json().Data)
      .map(item => this.extractData(item));
  }

  getTickets() : Observable<Ticket[]> {
    
    var url = "/helpdesk-rzn/api/tickets/?$orderby=RequestDate desc";

    var token = localStorage.getItem('token');
    var headers = new Headers();

    headers.append('Authorization', 'Bearer ' +  token);

    return this.http.get(url, { headers: headers })
      .map(r => r.json().Data.map(item => this.extractData(item)));
  }

  createTicket(ticket : any) : Observable<Ticket> {
    
    var url = "/helpdesk-rzn/api/tickets/";

    var token = localStorage.getItem('token');
    var headers = new Headers();

    headers.append('Authorization', 'Bearer ' +  token);

    return this.http.post(url, ticket, { headers: headers })
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
