import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ServiceService } from './service.service';
import { Service } from './service';

@Injectable()
export class ServiceListResolve implements Resolve<Service[]> {

  constructor(private route: ActivatedRoute, private service : ServiceService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.get(route.params["referenceId"])
      .toPromise()
      .then(data => data);
  }

}
