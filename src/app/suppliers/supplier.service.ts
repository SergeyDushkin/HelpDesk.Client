import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Supplier } from './supplier';
import { BaseApiService } from '../services/base-api.service';

@Injectable()
export class SupplierService {

  constructor(private apiService : BaseApiService) { 
  }

  get() : Observable<Supplier[]> {
    
    return this.apiService.get("suppliers/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  getById(id : string) : Observable<Supplier> {
    
    return this.apiService.get("suppliers/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  create(supplier : Supplier) : Observable<Supplier> {
    
    return this.apiService.post("suppliers/", supplier)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  update(supplier : Supplier) : Observable<Response> {
    
    return this.apiService.put("suppliers/" + supplier.id, supplier);
  }

  delete(id : string) : Observable<Response> {
    
    return this.apiService.delete("suppliers/" + id);
  }

  extractData(item : any) : Supplier {
    return new Supplier({ 
        id: item.id, 
        name: item.name
      });
  }

}
