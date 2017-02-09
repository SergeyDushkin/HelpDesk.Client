import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent implements OnInit {

  private address_length : number = 0;
  private user_length : number = 0;
  private unit_length : number = 0;

  private client : Client;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: ClientService) { }

  ngOnInit() {
    this.client = this.route.snapshot.data['client'];
  }

  onClickBack() {
    this.location.back();
  }

  onUserListChange(val) {
    //this.address_length = val;
  }

  onUpdate() {
    this.service.update(this.client).subscribe(
      (response) => this.router.navigate(['/clients/']),
      (err) => console.log("ClientService update: error " + err),
      () => console.log("ClientService update done"));
  }

}
