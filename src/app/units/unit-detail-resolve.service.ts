import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UnitService } from './unit.service';
import { Unit } from './unit';

@Injectable()
export class UnitDetailResolve implements Resolve<Unit> {

  constructor(private route: ActivatedRoute, private service : UnitService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params["referenceId"], route.params["id"])
      .toPromise()
      .then(data => data);
  }

}
