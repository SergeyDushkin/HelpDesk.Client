import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-new',
  templateUrl: './service-new.component.html'
})
export class ServiceNewComponent implements OnInit {

  private data : Service;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: ServiceService) { }

  ngOnInit() {
    this.data = new Service();
    this.data.referenceId = this.route.snapshot.params["referenceId"];
    this.data.resource = this.route.snapshot.params["resource"];
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.data).subscribe(
      (response) => this.router.navigate(['/services']),
      (err) => console.log("ClientService update: error " + err),
      () => console.log("ClientService update done"));
  }

}