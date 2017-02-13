import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Work } from './work';
import { TicketServiceApiService } from '../ticket-service-api.service';

@Injectable()
export class WorkService {

  private resource_url : string;

  private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private api : TicketServiceApiService) { 
    this.resource_url = 'works/';
  }

  get = (referenceId: string) : Observable<Work[]> =>
    this.api.get(this.resource() + `?referenceId=${referenceId}`)
      .map(r => r.json()
      .map(item => this.extractData(item)));

  getById = (id : string) : Observable<Work> =>
    this.api.get(this.resource(id))
      .map(r => r.json())
      .map(item => this.extractData(item));

  create = (create : Work) : Observable<Response> =>
    this.api.post(this.resource(), create);

  update = (update : Work) : Observable<Response> =>
    this.api.put(this.resource(update.id), update);

  delete = (id : string) : Observable<Response> =>
    this.api.delete(this.resource(id));

  extractData = (item : any) : Work =>
    new Work({ 
        resource: item.resource, 
        referenceId: item.referenceId,
        id: item.id,
        supplier: item.supplier,
        worker: item.worker,
        status: item.status,
        supplierId: item.supplierId,
        workerId: item.workerId,
        statusId: item.statusId,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description
      });
}