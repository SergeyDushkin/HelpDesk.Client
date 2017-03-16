import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { IIdentifiable } from '../model';
import { IDataService } from '../services/data.service';

export class BaseListComponent<T extends IIdentifiable, TService extends IDataService<T>> implements OnInit {

  private isLoading : boolean;
  private isInitialized  :boolean = false;
  private sortBy = "year";
  private sortOrder = "desc";

  private cache : T[];
  private data : T[];
  
  private _referenceId : string = undefined;
  private _filter : any = undefined;

  @Output() onSelect = new EventEmitter();
  @Output() countChange = new EventEmitter();
  
  @Input('count') _count : number = 0;
  @Input('onRefresh') onRefresh = new Subject<void>();
  
  @Input('referenceId') 
  set referenceId (val) {
    this._referenceId = val;

    if (this.isInitialized) {
      this.refresh();
    }
  }

  get referenceId() {
    return this._referenceId;
  }
  
  @Input('filter') 
  set filter (val) {
    this._filter = val;

    if (this.isInitialized) {
      this.refresh();
    }
  }

  get filter() {
    return this._filter;
  }
  
  get count() {
    return this._count;
  }

  set count(val) {
    this._count = val;
    this.countChange.emit(this._count);
  }

  constructor(private route: ActivatedRoute, private service: TService) { 
  }

  ngOnInit() {
    this.refresh().then(() => this.isInitialized = true);
    this.onRefresh.subscribe(() => this.refresh());
  }
  
  trackById(index, item) {
    return item.id;
  }  

  updateFilter(event, fields: any[]) {
    let val = event.target.value.toLowerCase();
  
    // filter our data
    //let temp = this.cache.filter(function(d) {
    //  fields.map(f => d[f].toLowerCase().indexOf(val))
    //  return d.departments.toLowerCase().indexOf(val) !== -1 || !val;
    //});
    // update the rows
    //this.data = temp;
  }

  selectRow(data) {
    this.onSelect.emit(data);
  }

  refresh() {
    this.isLoading = true;
    return this.service.get({ reference: this.referenceId, params: this.filter }).toPromise()
      .then(r => this.data = r)
      .then(r => this.cache = r)
      .then(r => this.count = r.length)
      .then(r => this.isLoading = false);
  }

}
