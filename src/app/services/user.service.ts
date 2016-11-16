import { User } from "../models/user";
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { RequestService } from '../services/request.service';

@Injectable()
export class UserService {

  public current_user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private requestService : RequestService) {}

  public setCurrentUser(user: User) {
    this.current_user.next(user);
  }

  public getCurrentUser() : Observable<User> {

    return this.requestService.get("api/user/me")
      .map(r => r.json().Data)
      .map(r => {
        var user = new User({ firstname : r.Name, avatar_url: "public/assets/img/avatar.png"});
        this.setCurrentUser(user);
        return new User(user);
      });
  }

  public clear() {
    this.current_user.next(null);
  }
}
