import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { User } from './user';
import { BaseApiService } from '../../services/base-api.service';

@Injectable()
export class UserService {

  constructor(private apiService : BaseApiService) { 
  }

  get(clientId : string) : Observable<User[]> {
    
    return this.apiService.get("clients/" + clientId + "/users/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  getById(clientId : string, id : string) : Observable<User> {
    
    return this.apiService.get("clients/" + clientId + "/users/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  create(clientId : string, user : User) : Observable<User> {
    
    return this.apiService.post("clients/" + clientId + "/users/", user)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  update(clientId : string, user : User) : Observable<Response> {
    
    return this.apiService.put("clients/" + clientId + "/users/" + user.id, user);
  }

  delete(clientId : string, id : string) : Observable<Response> {
    
    return this.apiService.delete("clients/" + clientId + "/users/" + id);
  }

  extractData(item : any) : User {
    return new User({ 
        id: item.id, 
        name: item.name
      });
  }

}
