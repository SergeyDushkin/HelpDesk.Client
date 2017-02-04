import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Unit } from './unit';
import { TicketServiceApiService } from '../../services/ticket-service-api.service';

@Injectable()
export class UnitService {

  private resource_url : string;

  private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private api : TicketServiceApiService) { 
    this.resource_url = 'businessunits/';
  }

  get = (referenceId: string) : Observable<Unit[]> =>
    this.api.get(this.resource() + `?referenceId=${referenceId}`)
      .map(r => r.json()
      .map(item => this.extractData(item)));

  getById = (referenceId: string, id : string) : Observable<Unit> =>
    this.api.get(this.resource(id) + `?referenceId=${referenceId}`)
      .map(r => r.json())
      .map(item => this.extractData(item));

  create = (create : Unit) : Observable<Response> =>
    this.api.post(this.resource(), create);

  update = (update : Unit) : Observable<Response> =>
    this.api.put(this.resource(update.id), update);

  delete = (id : string) : Observable<Response> =>
    this.api.delete(this.resource(id));

  extractData = (item : any) : Unit =>
    new Unit({ 
        id: item.Id, 
        resource: item.Resource, 
        referenceId: item.ReferenceId, 
        name: item.Name
      });

}
