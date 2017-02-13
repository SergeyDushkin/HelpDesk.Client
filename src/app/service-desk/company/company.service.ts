import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Company } from './company';
import { TicketServiceApiService } from '../ticket-service-api.service';

@Injectable()
export class CompanyService {

  private resource_url : string;

  private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private api : TicketServiceApiService) { 
    this.resource_url = 'suppliers/';
  }

  get = () : Observable<Company[]> =>
    this.api.get(this.resource())
      .map(r => r.json()
      .map(item => this.extractData(item)));

  getById = (id : string) : Observable<Company> =>
    this.api.get(this.resource(id))
      .map(r => r.json())
      .map(item => this.extractData(item));

  create = (create : Company) : Observable<Response> =>
    this.api.post(this.resource(), create);

  update = (update : Company) : Observable<Response> =>
    this.api.put(this.resource(update.id), update);

  delete = (id : string) : Observable<Response> =>
    this.api.delete(this.resource(id));

  extractData = (item : any) : Company =>
    new Company({ 
        resource: item.resource, 
        referenceId: item.referenceId, 
        id: item.id, 
        name: item.name
      });

}
