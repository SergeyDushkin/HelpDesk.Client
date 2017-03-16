import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { IIdentifiable, IDependently, NoParamConstructor } from '../model';
import { IDataService } from '../services/data.service';

export class DependentlyCreateComponent<T extends IIdentifiable & IDependently, TService extends IDataService<T>> {

  @Output() onCanceled = new EventEmitter();
  @Output() onUpdated = new EventEmitter();
  
  @Input('referenceId') 
  set referenceId (val) {
    this._referenceId = val;
    this.data.referenceId = val;
  }

  get referenceId() {
    return this._referenceId;
  }

  private _data : T;
  private _referenceId : string = undefined;

  get data() {
    return this._data;
  }

  set data(val) {
    this._data = val;
  }

  constructor(ctor: NoParamConstructor<T>, private route: ActivatedRoute, private location: Location, private router: Router, private service: TService) { 
    this.data = new ctor();
  }

  onClickBack() {
    this.onCanceled.emit();
  }

  onUpdate() {
    this.service.create(this.data, { reference: this.referenceId }).toPromise()
      .then(r => this.onUpdated.emit(r))
      .then(r => this.service.constructor.name + ': record was created');
  }
}

export class BasicCreateComponent<T extends IIdentifiable, TService extends IDataService<T>> {

  @Output() onCanceled = new EventEmitter();
  @Output() onUpdated = new EventEmitter();
  
  private _data : T;
  private _referenceId : string = undefined;

  get data() {
    return this._data;
  }

  set data(val) {
    this._data = val;
  }

  constructor(ctor: NoParamConstructor<T>, private route: ActivatedRoute, private location: Location, private router: Router, private service: TService) { 
    this.data = new ctor();
  }

  onClickBack() {
    this.onCanceled.emit();
  }

  onUpdate() {
    this.service.create(this.data).toPromise()
      .then(r => this.onUpdated.emit(r))
      .then(r => this.service.constructor.name + ': record was created');
  }
}
