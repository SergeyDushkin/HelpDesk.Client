import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html'
})
export class ClientNewComponent implements OnInit {

  private client : Client;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: ClientService) { }

  ngOnInit() {
    this.client = new Client();
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.createClient(this.client).subscribe(
      (response) => this.router.navigate(['/clients/']),
      (err) => console.log("ClientService update: error " + err),
      () => console.log("ClientService update done"));
  }

}
