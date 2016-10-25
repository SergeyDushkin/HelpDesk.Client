import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Observable, ReplaySubject} from 'rxjs/Rx';

import { Ticket } from './Ticket';

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
      .map(item => new Ticket({ 
        id: item.Id, 
        store: item.StoreName, 
        comments: item.Comments,
        ticketNumber: item.TicketNumber,
        startDate: item.RequestDate, 
        endDate: item.CompleteDate }));
  }

  getTickets() : Observable<Ticket[]> {
    
    var url = "/helpdesk-rzn/api/tickets/";

    var token = localStorage.getItem('token');
    var headers = new Headers();

    headers.append('Authorization', 'Bearer ' +  token);

    return this.http.get(url, { headers: headers })
      .map(r => r.json()
        .Data
        .map(item => new Ticket({ 
          id: item.Id, 
          store: item.StoreName, 
          comments: item.Comments, 
          ticketNumber: item.TicketNumber, 
          startDate: item.RequestDate, 
          endDate: item.CompleteDate }
          )));
  }

}
