import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Address } from './address';
import { BaseApiService } from '../../services/base-api.service';

@Injectable()
export class AddressService {

  constructor(private apiService : BaseApiService) { 
  }

  get(clientId : string) : Observable<Address[]> {
    
    return this.apiService.get("clients/" + clientId + "/address/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  getById(clientId : string, id : string) : Observable<Address> {
    
    return this.apiService.get("clients/" + clientId + "/address/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  create(clientId : string, address : Address) : Observable<Address> {
    
    return this.apiService.post("clients/" + clientId + "/address/", address)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  update(clientId : string, address : Address) : Observable<Response> {
    
    return this.apiService.put("clients/" + clientId + "/address/" + address.id, address);
  }

  delete(clientId : string, id : string) : Observable<Response> {
    
    return this.apiService.delete("clients/" + clientId + "/address/" + id);
  }

  extractData(item : any) : Address {
    return new Address({ 
        id: item.id, 
        name: item.name,
        address: item.contact.address
      });
  }

}
