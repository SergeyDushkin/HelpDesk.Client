import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { IIdentifiable } from '../model';
import { IDataService } from '../services/data.service';

export class BaseSelectComponent<T extends IIdentifiable, TService extends IDataService<T>> implements OnInit {

  private isLoading : boolean = false;
  private isInitialized  :boolean = false;
  private _value: string;
  private _source: T[] = new Array<T>();
  private _disabled: boolean = false;

  @Output() valueChange = new EventEmitter();
  @Output() onIWhantInfo = new EventEmitter();
  @Output() onIWhantCreateNew = new EventEmitter();
  @Output() countChange = new EventEmitter();

  @Input('count') _count : number = 0;
  @Input('onRefresh') onRefresh = new Subject<void>();
  
  @Input('disabled') 
  set disabled(val: boolean) {
    this._disabled = val;
  }
  get disabled() {
    return this._disabled;
  }

  @Input('value') 
  set value(val: string) {
    this._value = val;
    this.valueChange.emit(val);
  }
  get value() {
    return this._value;
  }

  @Input('source')
  set source(val: T[]) {
    this._source = val;
  }
  get source() {
    return this._source;
  }
  
  get count() {
    return this._count;
  }

  set count(val) {
    this._count = val;
    this.countChange.emit(this._count);
  }

  constructor(private route: ActivatedRoute, private service: TService) { }

  ngOnInit() {
    this.refresh().then(() => this.isInitialized = true);
    this.onRefresh.subscribe(() => this.refresh());
  }

  refresh() {
    this.isLoading = true;
    return this.service.get().toPromise()
      .then(r => this.source = r)
      .then(r => this.count = r.length)
      .then(r => this.isLoading = false);
  }

  trackById(index, item: T) {
    return item ? item.id : undefined;
  }

  onIWhantInfoClick() {
    this.onIWhantInfo.emit(this.value);
  }

  onIWhantCreateNewClick() {
    this.onIWhantCreateNew.emit();
  }

}