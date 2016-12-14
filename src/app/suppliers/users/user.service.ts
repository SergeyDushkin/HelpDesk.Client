import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { User } from './user';
import { BaseApiService } from '../../services/base-api.service';

@Injectable()
export class UserService {

  constructor(private apiService : BaseApiService) { 
  }

  get(supplierId : string) : Observable<User[]> {
    
    return this.apiService.get("suppliers/" + supplierId + "/users/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  getById(supplierId : string, id : string) : Observable<User> {
    
    return this.apiService.get("suppliers/" + supplierId + "/users/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  create(supplierId : string, user : User) : Observable<User> {
    
    return this.apiService.post("suppliers/" + supplierId + "/users/", user)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  update(supplierId : string, user : User) : Observable<Response> {
    
    return this.apiService.put("suppliers/" + supplierId + "/users/" + user.id, user);
  }

  delete(supplierId : string, id : string) : Observable<Response> {
    
    return this.apiService.delete("suppliers/" + supplierId + "/users/" + id);
  }

  extractData(item : any) : User {
    return new User({ 
        id: item.id, 
        name: item.name
      });
  }

}
