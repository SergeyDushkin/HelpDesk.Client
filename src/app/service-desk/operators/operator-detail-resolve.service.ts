import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { OperatorService } from './operator.service';
import { Operator } from './operator';

@Injectable()
export class OperatorDetailResolve implements Resolve<Operator> {

  constructor(private route: ActivatedRoute, private service : OperatorService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params["id"])
      .toPromise()
      .then(data => data);
  }

}
