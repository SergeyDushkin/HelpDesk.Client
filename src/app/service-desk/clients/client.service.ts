import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Client } from './client';
import { TicketServiceApiService } from '../ticket-service-api.service';

@Injectable()
export class ClientService {

  private resource_url : string;

  private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private api : TicketServiceApiService) { 
    this.resource_url = 'customers/';
  }

  get = () : Observable<Client[]> =>
    this.api.get(this.resource())
      .map(r => r.json()
      .map(item => this.extractData(item)));

  getById = (id : string) : Observable<Client> =>
    this.api.get(this.resource(id))
      .map(r => r.json())
      .map(item => this.extractData(item));

  create = (create : Client) : Observable<Response> =>
    this.api.post(this.resource(), create);

  update = (update : Client) : Observable<Response> =>
    this.api.put(this.resource(update.id), update);

  delete = (id : string) : Observable<Response> =>
    this.api.delete(this.resource(id));

  extractData = (item : any) : Client =>
    new Client({ 
        id: item.id, 
        name: item.name
      });

  /*

  constructor(private apiService : BaseApiService) { 
  }

  getClientById(id : string) : Observable<Client> {
    
    return this.apiService.get("clients/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  getClients() : Observable<Client[]> {
    
    return this.apiService.get("clients/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  createClient(client : Client) : Observable<Client> {
    
    return this.apiService.post("clients/", client)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  update(client : Client) : Observable<Client> {
    
    return this.apiService.put("clients/" + client.id, client)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  delete(id : string) : Observable<Response> {
    
    return this.apiService.delete("clients/" + id);
  }

  extractData(item : any) : Client {
    return new Client({ 
        id: item.id, 
        name: item.name
      });
  }*/

}
