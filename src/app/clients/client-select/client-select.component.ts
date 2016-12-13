import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../client';

@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html'
})
export class ClientSelectComponent implements OnChanges, OnInit {

  @Output() questionChange = new EventEmitter();
  @Input('disabled') _disabled : boolean;
  @Input('client') _client : Client;
  @Input('source') _source : Client[];

  get data() {

    if (!this._source) {
      return new Array<Client>(this._client);
    }

    return this._source;
  }

  get disabled() {

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
    this.questionChange.emit(this._client);
  }

  onChange(value){
    this.client = value;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
