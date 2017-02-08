import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html'
})
export class AddressListComponent implements OnInit {

  @Input('referenceId') referenceId : string = undefined;

  private address : Address[];

  constructor(private route: ActivatedRoute, private service: AddressService) { }

  ngOnInit() {
    this.address = this.route.snapshot.data['address'];

    if (!this.address) 
      this.service.get(this.referenceId).toPromise().then(r => this.address = r);
  }

}
