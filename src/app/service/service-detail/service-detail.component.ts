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

  private data : Service;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: ServiceService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['service'];
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.update(this.data).subscribe(
      (response) => this.router.navigate(['/services']),
      (err) => console.log("ServiceService update: error " + err),
      () => console.log("ServiceService update done"));
  }
}
