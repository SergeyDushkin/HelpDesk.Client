import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { User } from './user';
import { TicketServiceApiService } from '../../services/ticket-service-api.service';

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
        id: item.Id, 
        resource: item.Resource, 
        referenceId: item.ReferenceId, 
        firstName: item.FirstName, 
        middleName: item.MiddleName, 
        lastName: item.LastName, 
        genderCode: item.GenderCode, 
        dateOfBirth: item.DateOfBirth
      });
}