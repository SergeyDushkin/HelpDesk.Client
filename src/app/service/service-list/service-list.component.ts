import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html'
})
export class ServiceListComponent implements OnInit {

  private service : Service[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.service = this.route.snapshot.data['service'];
  }

}
