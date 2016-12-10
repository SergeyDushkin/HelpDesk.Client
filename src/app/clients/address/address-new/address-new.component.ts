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
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    let client_id = this.route.snapshot.params["client_id"];
    
    this.service.create(client_id, this.address).subscribe(
      (response) => this.router.navigate(['/clients/' + client_id]),
      (err) => console.log("ClientService update: error " + err),
      () => console.log("ClientService update done"));
  }

}