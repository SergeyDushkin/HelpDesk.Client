import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html'
})
export class UserSelectComponent implements  OnChanges, OnInit {

  @Output() questionChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('user') _user : User;
  private _client : string;
  @Input('source') _source : User[];

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
    if (!val) return;

    this._client = val;
    this.userService.get(val).toPromise().then(r => this._source = r);
  }

  get user() {
    return this._user;
  }

  set user(val) {
    this._user = val;
    this.questionChange.emit(this._user);
  }

  onChange(value){
    let idx = this._source.findIndex(r => r.id == value);
    let val = this._source[idx];
    
    this.user = val;
  }

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
