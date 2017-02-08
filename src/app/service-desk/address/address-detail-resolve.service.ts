import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AddressService } from './address.service';
import { Address } from './address';

@Injectable()
export class AddressDetailResolve implements Resolve<Address> {

  constructor(private route: ActivatedRoute, private service : AddressService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params["referenceId"], route.params["id"])
      .toPromise()
      .then(data => data);
  }

}
