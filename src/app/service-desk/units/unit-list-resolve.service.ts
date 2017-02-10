import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UnitService } from './unit.service';
import { Unit } from './unit';

@Injectable()
export class UnitListResolve implements Resolve<Unit[]> {

  constructor(private route: ActivatedRoute, private service : UnitService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.get(route.params["referenceId"])
      .toPromise()
      .then(data => data);
  }

}
