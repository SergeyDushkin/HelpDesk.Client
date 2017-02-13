import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { User } from './user';
import { TicketServiceApiService } from '../ticket-service-api.service';

@Injectable()
export class UserService {

  private resource_url : string;

  private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private api : TicketServiceApiService) { 
    this.resource_url = 'users/';
  }

  get = (referenceId: string) : Observable<User[]> =>
    this.api.get(this.resource() + `?referenceId=${referenceId}`)
      .map(r => r.json()
      .map(item => this.extractData(item)));

  getById = (referenceId: string, id : string) : Observable<User> =>
    this.api.get(this.resource(id) + `?referenceId=${referenceId}`)
      .map(r => r.json())
      .map(item => this.extractData(item));

  create = (create : User) : Observable<Response> =>
    this.api.post(this.resource(), create);

  update = (update : User) : Observable<Response> =>
    this.api.put(this.resource(update.id), update);

  delete = (id : string) : Observable<Response> =>
    this.api.delete(this.resource(id));

  extractData = (item : any) : User =>
    new User({ 
        id: item.id, 
        resource: item.resource, 
        referenceId: item.referenceId, 
        firstName: item.firstName, 
        middleName: item.middleName, 
        lastName: item.lastName, 
        genderCode: item.genderCode, 
        dateOfBirth: item.dateOfBirth
      });
}