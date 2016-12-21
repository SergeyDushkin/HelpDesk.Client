import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-select',
  templateUrl: './service-select.component.html'
})
export class ServiceSelectComponent implements OnChanges, OnInit {

  private data : Service[];

  @Output() serviceChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('service') _service : Service;

  get disabled() : boolean {
    return this._disabled;
  }

  get service() {
    return this._service;
  }

  set service(val) {
    this._service = val;
    this.serviceChange.emit(this._service);
  }

  onChange(value){
  }

  constructor(private route: ActivatedRoute, private serviceService: ServiceService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['service'];
  }

  ngOnChanges(changes) {
  }

}
