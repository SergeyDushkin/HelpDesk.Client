import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Contract } from './contract';
import { TicketServiceApiService } from '../services/ticket-service-api.service';

@Injectable()
export class ContractService {

  private resource_url : string;

  private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private api : TicketServiceApiService) { 
    this.resource_url = 'contracts/';
  }

  get = () : Observable<Contract[]> =>
    this.api.get(this.resource())
      .map(r => r.json()
      .map(item => this.extractData(item)));

  getById = (id : string) : Observable<Contract> =>
    this.api.get(this.resource(id))
      .map(r => r.json())
      .map(item => this.extractData(item));

  create = (create : Contract) : Observable<Response> =>
    this.api.post(this.resource(), create);

  update = (update : Contract) : Observable<Response> =>
    this.api.put(this.resource(update.id), update);

  delete = (id : string) : Observable<Response> =>
    this.api.delete(this.resource(id));

  extractData = (item : any) : Contract =>
    new Contract({ 
        id: item.Id, 
        resource: item.Resource, 
        referenceId: item.ReferenceId, 
        name: item.Name, 
        number: item.Number, 
        date: item.Date, 
        startDate: item.StartDate, 
        endDate: item.EndDate, 
        client: item.Client, 
        clientId: item.Client.Id
      });
}