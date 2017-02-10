import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-new',
  templateUrl: './address-new.component.html'
})
export class AddressNewComponent implements OnInit {

  private address : Address;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: AddressService) { }

  ngOnInit() {
    this.address = new Address();
    this.address.referenceId = this.route.snapshot.params["referenceId"];
    this.address.resource = this.route.snapshot.params["resource"];
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.address).subscribe(
      (response) => this.router.navigate(['/' + this.address.resource + '/' + this.address.referenceId]),
      (err) => console.log("ClientService update: error " + err),
      () => console.log("ClientService update done"));
  }

}