import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';

@Injectable()
export class UserListResolve implements Resolve<User[]> {

  constructor(private route: ActivatedRoute, private service : UserService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.get(route.params["supplier_id"])
      .toPromise()
      .then(data => data);
  }

}
