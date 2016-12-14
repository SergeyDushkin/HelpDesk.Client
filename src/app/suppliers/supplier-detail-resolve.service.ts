import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier';

@Injectable()
export class SupplierDetailResolve implements Resolve<Supplier> {

  constructor(private route: ActivatedRoute, private service : SupplierService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params["supplier_id"])
      .toPromise()
      .then(data => data);
  }

}
