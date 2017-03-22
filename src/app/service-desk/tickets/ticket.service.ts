import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Ticket, PageResult } from './ticket';
import { BaseApiService } from '../../services/base-api.service';
import { TicketServiceApiService } from '../ticket-service-api.service';

@Injectable()
export class TicketService {

  constructor(private apiService : BaseApiService, private ticketService: TicketServiceApiService) { 
  }

  getById(id : string) : Observable<Ticket> {
    
    return this.ticketService.get("tickets/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  getPage(page: number) : Observable<PageResult<Ticket>> {
    
    return this.ticketService.get(`tickets/?page=${page}&&results=100`)
      .map(r => {
        let count = r.headers.get('X-Total-Count');
        let data = r.json().map(i => this.extractData(i));

        return new PageResult(data, Number.parseInt(count));
      });
  }

  get() : Observable<Ticket[]> {
    
    return this.ticketService.get("tickets/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  create(ticket : Ticket) : Observable<Response> {
    
    return this.apiService.post("tickets/", ticket);
      //.map(r => r.json())
      //.map(item => this.extractData(item));
  }

  update(ticket : Ticket) : Observable<Response> {
    
    return this.apiService.put("tickets/" + ticket.id, ticket)
      //.map(r => r.json())
      //.map(item => this.extractData(item));
  }

  delete(id : string) : Observable<Response> {
    
    return this.apiService.delete("tickets/" + id);
  }

  extractData(item : any) : Ticket {
    return new Ticket({ 
        id: item.id, 
        ticketNumber: item.ticketNumber,
        clientId: item.clientId,
        addressId: item.addressId,
        priorityId : item.priorityId,
        statusId : item.statusId,
        userId: item.userId,
        contractId: item.contractId,
        description: item.description,
        requestDate: item.requestDate,
        completeDate: item.completeDate,
        startDate: item.startDate,
        endDate: item.endDate,
        createdAt: item.createdAt,
        applicantId: item.applicantId,
        operatorId: item.operatorId,

        contract: item.contract,
        operator: item.operator,
        priority: item.priority,
        status: item.status,
        client: item.client,
        address: item.address,
        user: item.user,
        applicant: item.applicant
      });
  }

}
