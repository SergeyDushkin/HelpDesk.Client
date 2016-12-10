import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Client} from './client';
import { BaseApiService } from '../services/base-api.service';

@Injectable()
export class ClientService {

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
  }

}
