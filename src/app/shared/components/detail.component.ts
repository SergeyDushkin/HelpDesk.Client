import { OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { IIdentifiable } from '../model';
import { IDataService } from '../services/data.service';

export class BaseDetailComponent<T extends IIdentifiable, TService extends IDataService<T>> implements OnInit {

  @Output() onLoaded = new EventEmitter();
  @Output() onCanceled = new EventEmitter();
  @Output() onUpdated = new EventEmitter();
  @Output() onDeleted = new EventEmitter();
  
  private isLoading : boolean;
  private _data = new BehaviorSubject<T>({} as T);
  private _id : string = undefined;
  private _referenceId : string = undefined;

  @Input('id') 
  set id (val) {
    this._id = val;
  }

  get id() {
    return this._id;
  }

  get data() : T {
    return this._data.getValue();
  }
  
  @Input('referenceId') 
  set referenceId (val) {
    this._referenceId = val;
  }

  get referenceId() {
    return this._referenceId;
  }

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: TService) { }

  ngOnInit() {
    this.refresh();
  }

  onClickBack() {
    this.onCanceled.emit();
  }

  onDelete() {
    this.service.delete({ id: this.data.id }).toPromise()
      .then(r => this.onDeleted.emit(r))
      .then(r => this.service.constructor.name + ': record was deleted');
  }

  onUpdate() {
    this.service.update(this.data, { reference: this.referenceId }).toPromise()
      .then(r => this.onUpdated.emit(r))
      .then(r => this.service.constructor.name + ': record was updated');
  }

  refresh() {
    this.isLoading = true;
    this.service.getById({ id: this.id, reference: this.referenceId })
      .subscribe(r => {
        this._data.next(r);
        this.onLoaded.emit(r);
        this.isLoading = false;
        this.afterLoad(r);
      });
  }

  afterLoad = (val: T) : void => {};
  beforeSave = () : void => {};
  afterSave = () : void => {};

}
