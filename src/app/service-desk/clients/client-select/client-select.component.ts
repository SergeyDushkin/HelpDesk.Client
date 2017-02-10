import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html'
})
export class ClientSelectComponent implements OnChanges, OnInit {

  @Output() clientChange = new EventEmitter();
  @Input('disabled') _disabled : boolean;
  @Input('client') _client : Client;
  @Input('source') _source : Client[];

  get data() {

    if (!this._source) {
      return new Array<Client>(this._client);
    }

    return this._source;
  }

  getInfoDisabled () : boolean {
    return false;
  }

  get disabled() : boolean {

    if (!this._disabled) {
      return false;
    }

    return this._disabled;
  }

  get client() {
    return this._client;
  }

  set client(val) {
    this._client = val;
    this.clientChange.emit(this._client);
  }

  onChange(value){
  }

  constructor(private route: ActivatedRoute, private service: ClientService) { }

  ngOnInit() {
    this._source = this.route.snapshot.data['clients'];

    if (!this._source)
      this.service.get().toPromise().then(r => this._source = r);
  }

  ngOnChanges(changes) {
  }

}
