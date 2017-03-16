import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { IIdentifiable } from '../model';
import { ApiService } from './api.service';
import { IDataService } from './data.service';

@Injectable()
export class BaseCacheApiClientService<T extends IIdentifiable> implements IDataService<T> {

  private resource_url : string;

  private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private api : ApiService, url : string) { 
    this.resource_url = url;
  }

  get = (params: any = null) : Observable<T[]> =>
    this.api.get(this.resource() + '?' + this.serialize(params))
      .map(r => r.json()
      .map(item => this.extractData(item)));

  getById = (id : string) : Observable<T> =>
    this.api.get(this.resource(id))
      .map(r => r.json())
      .map(item => this.extractData(item));

  create = (create : T) : Observable<Response> =>
    this.api.post(this.resource(), create);

  update = (update : T) : Observable<Response> =>
    this.api.put(this.resource(update.id), update);

  delete = (id : string) : Observable<Response> =>
    this.api.delete(this.resource(id));

  extractData = (item : any) : T => item as T;

  serialize = function(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
}