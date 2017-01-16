import { User } from "../models/user";
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { BaseApiService } from '../services/base-api.service';

@Injectable()
export class UserService {

  public current_user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private baseApiService : BaseApiService) {}

  public setCurrentUser(user: User) {
    this.current_user.next(user);
  }

  public getCurrentUser() : Observable<User> {

    return this.baseApiService.get("profile")
      .map(r => r.json())
      .map(r => {
        var user = new User({ firstname : r.name, avatar_url: "public/assets/img/avatar.png"});
        this.setCurrentUser(user);
        return new User(user);
      });
  }

  public clear() {
    this.current_user.next(null);
  }
}
