import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-select',
  templateUrl: './service-select.component.html'
})
export class ServiceSelectComponent implements OnChanges, OnInit {

  private _client : string;

  @Output() serviceChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('service') _service : Service;
  @Input('source') _source : Service[];

  get data() {
    return this._source;
  }

  get disabled() : boolean {
    return this._disabled;
  }

  @Input('client')
  get client() {
    return this._client;
  }

  set client(val) {

    if (!val) {
      this._source = new Array<Service>();
      return;
    }

    this._client = val;
    this.serviceService.get(val).toPromise()
      .then(r => this._source = r)
      .then(r => r[0])
      .then(r => this.service = r);
  }

  get service() {
    return this._service;
  }

  set service(val) {
    this._service = val;
    this.serviceChange.emit(this._service);
  }

  onChange(value){
    //let idx = this._source.findIndex(r => r.id == value);
    //let val = this._source[idx];
    //this.service = val;
  }

  constructor(private route: ActivatedRoute, private serviceService: ServiceService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  }

}
