import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html'
})
export class ServiceListComponent implements OnInit {

  @Input('referenceId') referenceId : string = undefined;

  private data : Service[];

  constructor(private route: ActivatedRoute, private service: ServiceService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['services'];

    if (!this.service) 
      this.service.get(this.referenceId).toPromise().then(r => this.data = r);
  }
  
  trackById(index, item) {
    return item.id;
  }

}
