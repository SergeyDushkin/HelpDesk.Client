import {User} from "../models/user";
import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';

@Injectable()
export class UserService{
  public current_user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private http: Http) {}

  public setCurrentUser(user: User){
    this.current_user.next(user);
  }

  public getCurrentUser() : Observable<User>{

    var token = localStorage.getItem('token');
    var headers = new Headers();
    //var base = document.head.getElementsByTagName('base')[0].getAttribute('href');
    //var base = '/helpdesk-rzn/';
    var base = "/helpdesk-rzn/";

    headers.append('Authorization', 'Bearer ' +  token);

    return this.http.get(base + "api/user/me", { headers: headers })
      .map(r => r.json().Data)
      .map(r => {
        var user = new User({ firstname : r.Name, avatar_url: "public/assets/img/avatar.png"});
        this.setCurrentUser(user);
        return new User(user);
      });
  }
}
