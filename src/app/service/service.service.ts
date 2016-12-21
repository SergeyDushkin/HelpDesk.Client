import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Service } from './service';
import { BaseApiService } from '../services/base-api.service';


@Injectable()
export class ServiceService {

  constructor(private apiService : BaseApiService) { 
  }

  get() : Observable<Service[]> {
    
    return this.apiService.get("service/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  getById(id : string) : Observable<Service> {
    
    return this.apiService.get("service/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  create(supplier : Service) : Observable<Service> {
    
    return this.apiService.post("service/", supplier)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  update(supplier : Service) : Observable<Response> {
    
    return this.apiService.put("service/" + supplier.id, supplier);
  }

  delete(id : string) : Observable<Response> {
    
    return this.apiService.delete("service/" + id);
  }

  extractData(item : any) : Service {
    return new Service({ 
        id: item.id, 
        name: item.name
      });
  }

}
