import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Operator } from './operator';
import { BaseApiService } from '../../services/base-api.service';

@Injectable()
export class OperatorService {

  constructor(private apiService : BaseApiService) { 
  }

  get() : Observable<Operator[]> {
    
    return this.apiService.get("operators/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  getById(id : string) : Observable<Operator> {
    
    return this.apiService.get("/operators/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  create(operator : Operator) : Observable<Operator> {
    
    return this.apiService.post("operators/", operator)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  update(operator : Operator) : Observable<Response> {
    
    return this.apiService.put("operators/" + operator.id, operator);
  }

  delete(id : string) : Observable<Response> {
    
    return this.apiService.delete("operators/" + id);
  }

  extractData(item : any) : Operator {
    return new Operator({ 
        id: item.id, 
        name: item.name
      });
  }

}
