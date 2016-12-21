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

  private _service : Service;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: ServiceService) { }

  ngOnInit() {
    this._service = new Service();
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this._service).subscribe(
      (response) => this.router.navigate(['/services']),
      (err) => console.log("ServiceService create: error " + err),
      () => console.log("ServiceService create done"));
  }

}
