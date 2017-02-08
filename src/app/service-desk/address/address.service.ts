import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Address } from './address';
import { TicketServiceApiService } from '../ticket-service-api.service';

@Injectable()
export class AddressService {

  private resource_url : string;

  private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private api : TicketServiceApiService) { 
    this.resource_url = 'addresses/';
  }

  get = (referenceId: string) : Observable<Address[]> =>
    this.api.get(this.resource() + `?referenceId=${referenceId}`)
      .map(r => r.json()
      .map(item => this.extractData(item)));

  getById = (referenceId: string, id : string) : Observable<Address> =>
    this.api.get(this.resource(id) + `?referenceId=${referenceId}`)
      .map(r => r.json())
      .map(item => this.extractData(item));

  create = (create : Address) : Observable<Response> =>
    this.api.post(this.resource(), create);

  update = (update : Address) : Observable<Response> =>
    this.api.put(this.resource(update.id), update);

  delete = (id : string) : Observable<Response> =>
    this.api.delete(this.resource(id));

  extractData = (item : any) : Address =>
    new Address({ 
        id: item.Id, 
        resource: item.Resource, 
        referenceId: item.ReferenceId, 
        name: item.Name, 
        address: item.Address
      });

}
