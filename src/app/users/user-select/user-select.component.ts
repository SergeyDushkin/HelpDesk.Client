import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html'
})
export class UserSelectComponent implements OnChanges, OnInit {

  private _client : string;

  @Output() userChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('user') _user : User;
  @Input('source') _source : User[];

  get data() {
    return this._source;
  }

  get disabled() : boolean {
    return this._disabled;
  }

  @Input('client')
  set client(val) {
    
    if (!val) {
      this._source = new Array<User>();
      return;
    }

    this._client = val;
    this.userService.get(val).toPromise()
      .then(r => this._source = r)
      .then(r => r[0])
      .then(r => this.user = r);
  }

  get user() {
    return this._user;
  }

  set user(val) {
    this._user = val;
    this.userChange.emit(this._user);
  }

  onChange(value){
    //let idx = this._source.findIndex(r => r.id == value);
    //let val = this._source[idx];
    //this.user = val;
  }

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  }

}
