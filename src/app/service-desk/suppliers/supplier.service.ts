import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Supplier } from './supplier';
import { TicketServiceApiService } from '../ticket-service-api.service';

@Injectable()
export class SupplierService {

  private resource_url : string;

  private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private api : TicketServiceApiService) { 
    this.resource_url = 'suppliers/';
  }

  get = () : Observable<Supplier[]> =>
    this.api.get(this.resource())
      .map(r => r.json()
      .map(item => this.extractData(item)));

  getById = (id : string) : Observable<Supplier> =>
    this.api.get(this.resource(id))
      .map(r => r.json())
      .map(item => this.extractData(item));

  create = (create : Supplier) : Observable<Response> =>
    this.api.post(this.resource(), create);

  update = (update : Supplier) : Observable<Response> =>
    this.api.put(this.resource(update.id), update);

  delete = (id : string) : Observable<Response> =>
    this.api.delete(this.resource(id));

  extractData = (item : any) : Supplier =>
    new Supplier({ 
        resource: item.Resource, 
        referenceId: item.ReferenceId, 
        id: item.Id, 
        name: item.Name
      });

}
