import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Client } from './client';
import { RequestService } from '../services/request.service';

@Injectable()
export class ClientService {

  private clients : Client[];

  constructor(private requestService : RequestService) { }

  getStoreClients(storeId : string) : Observable<Client[]> {
    
    if (this.clients){
      return Observable.of(this.clients);
    }

    var url = "api/store/" + storeId + "/users";

    return this.requestService.get(url)
      .map(r => r.json()
        .Data
        .map(item => new Client({ 
          id: item.GUID_RECORD, 
          name: item.LOCATION_NAME })
          ));
  }
}
