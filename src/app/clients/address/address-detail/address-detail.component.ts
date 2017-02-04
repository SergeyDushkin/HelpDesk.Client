import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html'
})
export class AddressDetailComponent implements OnInit {

  private address : Address;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: AddressService) { }

  ngOnInit() {
    this.address = this.route.snapshot.data['address'];
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.update(this.address).subscribe(
      (response) => this.router.navigate(['/clients/' + this.address.referenceId]),
      (err) => console.log("AddressService update: error " + err),
      () => console.log("AddressService update done"));
  }
}
