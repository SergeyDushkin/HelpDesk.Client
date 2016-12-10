import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../address';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html'
})
export class AddressListComponent implements OnInit {

  private address : Address[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.address = this.route.snapshot.data['address'];
  }

}
