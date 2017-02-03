import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Status } from './status';
import { TicketServiceApiService } from '../../services/ticket-service-api.service';

@Injectable()
export class StatusService {

  private resource_url : string;

  private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private api : TicketServiceApiService) { 
    this.resource_url = 'work-status/';
  }

  get = () : Observable<Status[]> =>
    this.api.get(this.resource())
      .map(r => r.json()
      .map(item => this.extractData(item)));

  getById = (id : string) : Observable<Status> =>
    this.api.get(this.resource(id))
      .map(r => r.json())
      .map(item => this.extractData(item));

  create = (create : Status) : Observable<Response> =>
    this.api.post(this.resource(), create);

  update = (update : Status) : Observable<Response> =>
    this.api.put(this.resource(update.id), update);

  delete = (id : string) : Observable<Response> =>
    this.api.delete(this.resource(id));

  extractData = (item : any) : Status =>
    new Status({ 
        id: item.Id, 
        name: item.Name
      });
}
