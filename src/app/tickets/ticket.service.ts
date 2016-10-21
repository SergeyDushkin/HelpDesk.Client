import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Ticket } from './Ticket';

@Injectable()
export class TicketService {

  Tickets: Ticket[] = [
    {id: '11', store: 'Марьина Роща', comments : 'Заявка 1', startDate : new Date(), endDate : null },
    {id: '12', store: 'Марьина Роща', comments : 'Заявка 2', startDate : new Date(), endDate : null },
    {id: '13', store: 'Марьина Роща', comments : 'Заявка 3', startDate : new Date(), endDate : new Date() },
    {id: '14', store: 'Марьина Роща', comments : 'Заявка 4', startDate : new Date(), endDate : new Date() },
    {id: '15', store: 'Марьина Роща', comments : 'Заявка 5', startDate : new Date(), endDate : new Date() }
  ];

  constructor(private http: Http) { 

  }

  getTickets() : Promise<Ticket[]> {
    return Promise.resolve(this.Tickets);
  }

}
