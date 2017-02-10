import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AddressService } from './address.service';
import { Address } from './address';

@Injectable()
export class AddressListResolve implements Resolve<Address[]> {

  constructor(private route: ActivatedRoute, private service : AddressService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.get(route.params["referenceId"])
      .toPromise()
      .then(data => data);
  }

}
