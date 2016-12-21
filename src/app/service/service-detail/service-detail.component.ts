import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html'
})
export class ServiceDetailComponent implements OnInit {

  private _service : Service;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: ServiceService) { }

  ngOnInit() {
    this._service = this.route.snapshot.data['service'];
  }

  onClickBack() {
    this.location.back();
  }

  onDelete() {
    this.service.delete(this._service.id).subscribe(
      (response) => this.router.navigate(['/service']),
      (err) => console.log("ServiceService delete: error " + err),
      () => console.log("ServiceService delete done"));
  }

  onUpdate() {
    this.service.update(this._service).subscribe(
      (response) => this.router.navigate(['/service']),
      (err) => console.log("ServiceService update: error " + err),
      () => console.log("ServiceService update done"));
  }

}
